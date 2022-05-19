const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -10, max: 210};

const labels = ['Trix','All-Bran with Extra Fiber','Mueslix Crispy Blend','Quaker Oatmeal','Nutri-grain Wheat','Raisin Bran','Smacks','Maypo'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Sodium',
      data: [140, 140, 150,0, 170, 210, 70,0],
      backgroundColor: '#FFFF00',
      borderColor: '#FFFF00',
      
    },
    {
      label: 'Sugar',
      data: [12, 0, 13,-1, 2, 12,15,3],
      backgroundColor: '#4682B4',
      borderColor: '#4682B4',
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transition Interaction'
      }
    }
  },
};

const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -10, max: 210});
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart) {
      const data = chart.data;
      const dsColor = Utils.namedColor(chart.data.datasets.length);
      const newDataset = {
        label: 'Dataset ' + (data.datasets.length + 1),
        backgroundColor: Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        borderWidth: 1,
        data: Utils.numbers({count: data.labels.length, min: -10, max: 210}),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Add Data',
    handler(chart) {
      const data = chart.data;
      if (data.datasets.length > 0) {
        data.labels = ['Trix','All-Bran with Extra Fiber','TrMueslix Crispy Blend','Nutri-grain Wheat','Raisin Bran','Smacks','Maypo'];

        for (let index = 0; index < data.datasets.length; ++index) {
          data.datasets[index].data.push(Utils.rand(-100, 100));
        }

        chart.update();
      }
    }
  },
  {
    name: 'Remove Dataset',
    handler(chart) {
      chart.data.datasets.pop();
      chart.update();
    }
  },
  {
    name: 'Remove Data',
    handler(chart) {
      chart.data.labels.splice(-1, 1); // remove the label first

      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });

      chart.update();
    }
  }
];
