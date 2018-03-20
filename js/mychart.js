var myChart1 = echarts.init(document.getElementById('myChart1'));

option = {
    title : {
        text: '今日交易额TOP10占比图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['轮轴','轮轴2','轮轴3','轮轴4','轮轴5','轮轴6','轮轴7','轮轴8','轮轴9','轮轴?']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'轮轴'},
                {value:310, name:'轮轴2'},
                {value:234, name:'轮轴3'},
                {value:135, name:'轮轴4'},
                {value:548, name:'轮轴5'},
                {value:318, name:'轮轴6'},
                {value:718, name:'轮轴7'},
                {value:988, name:'轮轴8'},
                {value:100, name:'轮轴9'},
                {value:641, name:'轮轴?'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

//使用刚指定的配置项和数据显示图表。
myChart1.setOption(option);

var myChart2 = echarts.init(document.getElementById('myChart2'));

option = {
    title : {
        text: '今日交易数量TOP10占比图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['轮轴','轮轴2','轮轴3','轮轴4','轮轴5','轮轴6','轮轴7','轮轴8','轮轴9','轮轴?']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'轮轴'},
                {value:310, name:'轮轴2'},
                {value:234, name:'轮轴3'},
                {value:135, name:'轮轴4'},
                {value:548, name:'轮轴5'},
                {value:318, name:'轮轴6'},
                {value:718, name:'轮轴7'},
                {value:988, name:'轮轴8'},
                {value:100, name:'轮轴9'},
                {value:641, name:'轮轴?'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

//使用刚指定的配置项和数据显示图表。
myChart2.setOption(option);