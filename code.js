function rideDateComparer(a, b) {
  if (a.ride_date < b.ride_date) return -1;
  if (a.ride_date > b.ride_date) return 1;
  return 0;
}

function chart({elementName, title, type, yAxisKey, data}) {
  const element = document.getElementById(elementName);
  new Chart(element, {
    type,
    data: {
      datasets: [{
        label: title,
        data,
        borderColor: '#0B2161',
        borderWidth: 1,
        barThickness: 1,
      }]
    },
    options: {
      parsing: {
        xAxisKey: 'ride_date',
        yAxisKey,
      },
      scales: {
        x: {
          type: 'time'
        },
        y: {
          beginAtZero: true
        },
      },
      plugins: {
        zoom: {
          zoom: {
            drag: {
              enabled: true
            },
            mode: 'x'
          }
        },
        tooltip: {
          callbacks: {
            label: tooltipLabel,
            title: () => undefined
          }
        }
      },
    }
  });
}

function tooltipLabel(item) {
  return [
    item.raw.ride_date,
    item.raw.where_to,
    item.formattedValue,
  ];
}

function vanity({elementName, value, unit, fixed}) {
  fixed = (fixed === undefined ? 2 : fixed);
  const element = document.getElementById(elementName);
  element.innerHTML = value.toFixed(fixed) + " " + (unit || "");
}

function vanityDistance({elementName, value, unit}) {
  vanity({elementName, value, unit: unit || 'miles'});
}

function vanitySpeed({elementName, value}) {
  vanity({elementName, value, unit: 'mph'});
}

// AI Ride Insights: analyzes ride history and returns plain-English takeaways
// and recommended next actions based on recent vs prior trends.
function generateRideInsights(rides) {
  if (!rides || rides.length === 0) return { takeaways: [], actions: [] };

  const sorted = [...rides].sort(rideDateComparer);
  const mostRecent = new Date(sorted[sorted.length - 1].ride_date);

  // Helper: parse a ride_date string into a Date
  function rideDate(r) { return new Date(r.ride_date); }

  // Helper: days between two Date objects
  function daysDiff(a, b) {
    return Math.round(Math.abs(a - b) / (1000 * 60 * 60 * 24));
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const WEEKS_PER_MONTH = 4.3;
  const cutoff30 = new Date(mostRecent - 30 * MS_PER_DAY);
  const cutoff60 = new Date(mostRecent - 60 * MS_PER_DAY);

  const last30 = sorted.filter(r => rideDate(r) > cutoff30);
  const prev30 = sorted.filter(r => rideDate(r) > cutoff60 && rideDate(r) <= cutoff30);

  function avg(arr, key) {
    if (!arr.length) return 0;
    return arr.reduce((s, r) => s + (r[key] || 0), 0) / arr.length;
  }

  function sum(arr, key) {
    return arr.reduce((s, r) => s + (r[key] || 0), 0);
  }

  function pct(a, b) {
    if (!b) return null;
    return Math.round(((a - b) / b) * 100);
  }

  function fmt(n, decimals) {
    return n.toFixed(decimals === undefined ? 1 : decimals);
  }

  const takeaways = [];
  const actions = [];

  // --- Total mileage (used in multiple places) ---
  const totalMiles = Math.round(sum(sorted, 'distance'));

  // --- Activity frequency ---
  const freqChange = pct(last30.length, prev30.length);
  if (last30.length > 0) {
    if (prev30.length === 0) {
      takeaways.push(`You've done ${last30.length} ride${last30.length !== 1 ? 's' : ''} in the last 30 days — great to see you back in the saddle!`);
    } else if (freqChange !== null && freqChange > 15) {
      takeaways.push(`You rode ${last30.length} times in the last 30 days, up ${freqChange}% from ${prev30.length} ${prev30.length === 1 ? 'time' : 'times'} the prior 30 days. Your consistency is trending up!`);
    } else if (freqChange !== null && freqChange < -15) {
      takeaways.push(`Ride count dropped from ${prev30.length} to ${last30.length} over the last 30 days (${Math.abs(freqChange)}% fewer rides).`);
      actions.push('Try scheduling 2–3 shorter rides per week to rebuild your habit.');
    } else {
      takeaways.push(`Steady as she goes — you averaged about ${fmt(last30.length / WEEKS_PER_MONTH, 1)} rides per week over the last 30 days.`);
    }
  }

  // --- Distance trend ---
  const avgDistLast = avg(last30, 'distance');
  const avgDistPrev = avg(prev30, 'distance');
  const distChange = pct(avgDistLast, avgDistPrev);
  if (last30.length > 0) {
    if (prev30.length === 0 || distChange === null) {
      takeaways.push(`Your average ride distance lately is ${fmt(avgDistLast)} miles.`);
    } else if (distChange > 10) {
      takeaways.push(`Average ride distance is up ${distChange}% (${fmt(avgDistPrev)} → ${fmt(avgDistLast)} miles) — you're pushing further!`);
    } else if (distChange < -10) {
      takeaways.push(`Average ride distance dipped ${Math.abs(distChange)}% (${fmt(avgDistPrev)} → ${fmt(avgDistLast)} miles) recently.`);
      actions.push('Consider adding one longer ride per week to maintain your base fitness.');
    }
  }

  // --- Speed trend ---
  const avgSpeedLast = avg(last30, 'average_speed');
  const avgSpeedPrev = avg(prev30, 'average_speed');
  const speedChange = pct(avgSpeedLast, avgSpeedPrev);
  if (last30.length > 0 && avgSpeedLast > 0) {
    if (prev30.length === 0 || speedChange === null) {
      takeaways.push(`Your average speed lately is ${fmt(avgSpeedLast)} mph.`);
    } else if (speedChange > 5) {
      takeaways.push(`Average speed improved ${speedChange}% (${fmt(avgSpeedPrev)} → ${fmt(avgSpeedLast)} mph) — you're getting faster!`);
    } else if (speedChange < -5) {
      takeaways.push(`Average speed was ${fmt(avgSpeedLast)} mph vs ${fmt(avgSpeedPrev)} mph in the prior month — a slight slowdown.`);
      actions.push('A few interval or tempo efforts could help restore your average speed.');
    }
  }

  // --- All-time records ---
  const allTimeLongest = sorted.reduce((max, r) => Math.max(max, r.distance || 0), 0);
  const allTimeFastest = sorted.reduce((max, r) => Math.max(max, r.average_speed || 0), 0);
  takeaways.push(`All-time: longest ride is ${fmt(allTimeLongest)} miles, fastest average speed is ${fmt(allTimeFastest)} mph.`);

  // --- Recent gap ---
  const daysSinceLast = daysDiff(new Date(), mostRecent);
  if (daysSinceLast > 14) {
    takeaways.push(`It's been ${daysSinceLast} days since your last ride.`);
    actions.push('Even a short spin today will help shake off the rust and restore momentum.');
  } else if (daysSinceLast <= 3) {
    actions.push('You rode recently — make sure to include easy recovery days to stay fresh.');
  }

  // --- Volume milestone ---
  const milestones = [100, 500, 1000, 2500, 5000, 10000, 15000, 20000, 25000, 30000];
  const nextMilestone = milestones.find(m => m > totalMiles);
  if (nextMilestone) {
    const remaining = nextMilestone - totalMiles;
    takeaways.push(`You've logged ${totalMiles.toLocaleString()} total miles — only ${remaining.toLocaleString()} more to reach ${nextMilestone.toLocaleString()}!`);
  }

  // --- Generic positive action if nothing specific flagged ---
  if (actions.length === 0) {
    actions.push('Keep up the great work — aim to mix in one challenging ride and one easy recovery ride each week.');
  }

  return { takeaways, actions };
}

// Functions for walking-specific charts
function walkDateComparer(a, b) {
  if (a.walk_date < b.walk_date) return -1;
  if (a.walk_date > b.walk_date) return 1;
  return 0;
}

function chartWalk({elementName, title, type, yAxisKey, data}) {
  const element = document.getElementById(elementName);
  new Chart(element, {
    type,
    data: {
      datasets: [{
        label: title,
        data,
        borderColor: '#0B2161',
        borderWidth: 1,
        barThickness: 1,
      }]
    },
    options: {
      parsing: {
        xAxisKey: 'walk_date',
        yAxisKey,
      },
      scales: {
        x: {
          type: 'time'
        },
        y: {
          beginAtZero: true
        },
      },
      plugins: {
        zoom: {
          zoom: {
            drag: {
              enabled: true
            },
            mode: 'x'
          }
        },
        tooltip: {
          callbacks: {
            label: tooltipLabelWalk,
            title: () => undefined
          }
        }
      },
    }
  });
}

function tooltipLabelWalk(item) {
  return `${item.raw.walk_date}, ${item.formattedValue}`;
}
