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
