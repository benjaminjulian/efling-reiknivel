		var job = "Ræsting";
		var isset = false;
		var barChartData = {};
		var step = 1.000;
		var stepid = 0;
		var id = document.getElementById("language").value;
		function refreshBarChartData() {
			hours1 = 0;
			hours2 = 0;
			hours3 = 0;
			hours4 = 0;
			leidretting = 0;
			if (laun[job].lfl >= 117 && laun[job].lfl <= 124) leidretting = 15000;
			switch (laun[job].lfl) {
				case 125: 13500; break;
				case 126: 12000; break;
				case 127: 9000; break;
				case 128: 7500; break;
				case 129: 4500; break;
				case 130: 2000; break;
			}
			w1 = Math.round((laun[job].grunnur + 17000)*step) + hours1;
			w2 = Math.round((laun[job].grunnur + 17000 + 24000)*step) + hours2 + leidretting;
			w3 = Math.round((laun[job].grunnur + 17000 + 24000 + 24000)*step) + hours3 + leidretting;
			w4 = Math.round((laun[job].grunnur + 17000 + 24000 + 24000 + 25000)*step) + hours4 + leidretting;
			extrainfotext = "<br /><table><thead><tr><th>" + str_th_1[id] + "</th><th>" + str_th_2[id] + "</th>" +
				"<th>" + str_th_3[id] + "</th><th>" + str_th_4[id] + "</th></tr></thead>" +
				"<tr><td>" + numberSeparated(w1) + "</td><td>" + numberSeparated(w2) + "</td><td>" + numberSeparated(w3) + "</td><td>" + numberSeparated(w4) + "</td></tr></table><br />";
			extrainfotext += str_desc[id].replace("<l>", numberSeparated(leidretting));
			document.getElementById("extrainfo").innerHTML = extrainfotext;
			barChartData = {
				labels: [str_ch_1[id], str_ch_2[id], str_ch_3[id], str_ch_4[id]],
				datasets: [{
					label: str_basic[id],
					backgroundColor: "#505050",
					data: [
						Math.round(laun[job].grunnur*step),
						Math.round(laun[job].grunnur*step),
						Math.round(laun[job].grunnur*step),
						Math.round(laun[job].grunnur*step)
					]
				}, {
					label: str_raise_1[id],
					backgroundColor: "#0000FF",
					data: [
						Math.round(17000 * step),
						Math.round(17000 * step),
						Math.round(17000 * step),
						Math.round(17000 * step)
					]
				}, {
					label: str_raise_2[id],
					backgroundColor: "#5050FF",
					data: [
						0,
						Math.round(24000 * step),
						Math.round(24000 * step),
						Math.round(24000 * step)
					]
				}, {
					label: str_l[id],
					backgroundColor: "#FFFF00",
					data: [
						0,
						leidretting,
						leidretting,
						leidretting
					]
				}, {
					label: str_raise_3[id],
					backgroundColor: "#A8A8FF",
					data: [
						0,
						0,
						Math.round(24000 * step),
						Math.round(24000 * step)
					]
				}, {
					label: str_raise_4[id],
					backgroundColor: "#CCCCFF",
					data: [
						0,
						0,
						0,
						Math.round(25000 * step)
					]
				}]
			};
		}

		function setChart() {
			refreshBarChartData(id);
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					legend: {
						display: true,
						position: 'bottom'
					},
					title: {
						display: true,
						text: job + " (" + str_lfl[id] + " " + laun[job].lfl + ")"
					},
			        tooltips: {
			            mode: 'label',
			            callbacks: {
			                label: function(tooltipItem, data) {
			                    var wageitem = data.datasets[tooltipItem.datasetIndex].label;
			                    var amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
			                    var total = 0;
			                    for (var i = 0; i < data.datasets.length; i++)
			                        total += data.datasets[i].data[tooltipItem.index];
			                    if (tooltipItem.datasetIndex != data.datasets.length - 1) {
			                        return wageitem + ": " + numberSeparated(amount) + "kr";
			                    } else {
			                        return [wageitem + ": " + numberSeparated(amount) + "kr", str_alls[id] + ": " + numberSeparated(total) + "kr"];
			                    }
			                }
			            }
			        },
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true
						}]
					}
				}
			});
		}

		function numberSeparated(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}

		function clickcheck(item) {
			resetGraph();
		}

		function setStep(item) {
			stepid = parseInt(item.options[item.selectedIndex].value);
			switch (item.options[item.selectedIndex].value) {
				case "0": step = 1.00; break;
				case "1": step = 1.02; break;
				case "2": step = 1.04; break;
				case "3": step = 1.06; break;
				case "4": step = 1.08; break;
				case "5": step = 1.10; break;
				case "6": step = 1.12; break;
				case "7": step = 1.14; break;
				case "8": step = 1.16; break;
			}
			resetGraph();
		}

		function resetGraph() {
			if (isset) {
				window.myBar.destroy();
			}
			job = document.getElementById("jobname").value;
			if (job != "") {
				document.getElementById("extrainfo").innerHTML = "";
				setChart();
				isset = true;
			}
		}