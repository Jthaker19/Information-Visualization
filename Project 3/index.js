        const labels = [
          'Trix',
          'All-Bran with Extra Fiber',
          'Mueslix Crispy Blend',
          'Nutri-grain Wheat',
          'Raisin Bran',
          'Muesli Raisins, Dates, & Almonds',
          'Quaker Oatmeal',
          'Just Right Fruit & Nut',
          '100% Bran',
          'Quaker Oat Squares',
          'Cocoa Puffs',
          'Oatmeal Raisin Crisp',
          'Total Raisin Bran',
          'All-Bran',
          'Crispix',
          'Mueslix Crispy Blend',
          'Smacks',
          'Cap n Crunch',
          'Puffed Rice',
          'Maypo'
        ];
      
        const data = {
          labels: labels,
          datasets: [{
            label: 'Calories',
            backgroundColor: '#4682B4',
            borderColor: '#FFFF00',
            data: [110, 50, 60, 90, 120, 150, 100,140,70,100,110,130,140,70,110,160,110,120,50,100],
          }]
        };
      
        const config = {
          type: 'line',
          data: data,
          options: {}
          };
        
