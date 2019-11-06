<script>
import firebase from 'firebase'
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
    extends: Bar,
    data() {
        return {
            datacollection: {
        //Data to be represented on x-axis
                labels: [],
                datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#6A5ACD',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: []
                }
                ]
            },
            //Chart.js options that controls the appearance of the chart
            options: {
                scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true
                    },
                    gridLines: {
                    display: true
                    }
                }],
                xAxes: [ {
                    gridLines: {
                    display: false
                    }
                }]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    created() {
        },
    mounted() {
        this.TotalVisitor()
    },
    methods: {
        async TotalVisitor() {
            await firebase.firestore().collection('visitorStat').get().then(res => {
                var L = res.docs.reverse()
                for (var i = 0; i < 7; i++) {
                    this.datacollection.datasets[0].data.push(L[i].data().totalVisitor)
                    this.datacollection.labels.push(L[i].id)
                }
                this.datacollection.datasets[0].data.reverse()
                this.datacollection.labels.reverse()
            })
            this.renderChart(this.datacollection, this.options)
        }
    }
}
</script>
