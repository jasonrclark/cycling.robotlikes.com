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
        borderColor: 'black',
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
      }
    }
  });
}

function vanity({elementName, value, unit}) {
  const element = document.getElementById(elementName);
  element.innerHTML = value.toFixed(2) + " " + unit;
}

function vanityDistance({elementName, value}) {
  vanity({elementName, value, unit: 'miles'});
}

function vanitySpeed({elementName, value}) {
  vanity({elementName, value, unit: 'mph'});
}
