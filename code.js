function rideDateComparer(a, b) {
  if (a.ride_date < b.ride_date) return -1;
  if (a.ride_date > b.ride_date) return 1;
  return 0;
}

function chart({elementName, title, type, yAxisKey, data}) {
  const perDistance = document.getElementById(elementName);
  new Chart(perDistance, {
    type,
    data: {
      datasets: [{
        label: title,
        data,
        borderColor: 'black',
        borderWidth: 1,
      }]
    },
    options: {
      parsing: {
        xAxisKey: 'ride_date',
        yAxisKey,
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
