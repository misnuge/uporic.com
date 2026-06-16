"use strict";

//var stock_data = stock_data || {};

//d3.csv("/stockcandles?code=005960&n=200", (err, data) => console.log(data))

var parseDate = d3.timeParse("%Y%m%d");

var stock_data = {};

//var code = "005930"

// https://github.com/d3/d3-request/blob/master/README.md#csv

function query_candle(code) {
    d3.json("/stockcandles?code=" + code + "&n=250", function(err, data){
        //console.log(data)
        //stock_data.name = code;
        stock_data.ohlc = data.map(function(d) {
            //console.log(d);
            return {
                date: parseDate(d.date),
                //date: +d.date,
                open: +d.open,
                high: +d.high,
                low: +d.low,
                close: +d.close,
                volume: +d.volume
            };
        }).sort(function(a, b) { return d3.ascending(a.date, b.date); });    
        //console.log(stock_data)    
        query_indicators(code)
    });
}

function query_indicators(code) {
    stock_data.name = code
    //query_candle(code);
    //console.log(ohlc_data)
    //stock_data.ohlc = ohlc_data
    //console.log(stock_data);
    
    //stock_data.name = "Samsung Electronics"
    stock_data.trendlines = [],
    
    stock_data.supstances = []
    
    stock_data.trades = [
        { date: stock_data.ohlc[130].date, type: "buy", price: stock_data.ohlc[130].low, low: stock_data.ohlc[130].low, high: stock_data.ohlc[130].high },
        { date: stock_data.ohlc[150].date, type: "sell", price: stock_data.ohlc[150].high, low: stock_data.ohlc[150].low, high: stock_data.ohlc[150].high }
        //{ date: data[130].date, type: "buy", price: data[130].low, low: data[130].low, high: data[130].high }
        //{ date: data[170].date, type: "sell", price: data[170].low, low: data[170].low, high: data[170].high }
    ];
    
    stock_data.preroll = 33
    
    //console.log(stock_data)

    d3.select('div#chart').call(chart);
}