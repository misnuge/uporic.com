//https://www.vojtechruzicka.com/javascript-this-keyword/#:~:text=If%20you%20are%20coming%20from,behaves%20in%20an%20unexpected%20way.

let parseDate = d3.timeParse("%Y%m%d");
let parseDateTime = d3.timeParse("%Y%m%d %H:%M:%S");
//let stock_data = {};

class Data {
    constructor(){
        this.stock_data = {};
        this.stock_data.ohlc=[];
        this.stockcodes = {};
    }

    async query_stockcodes () {
        try {
            let codes = await d3.json("/bridge/stockcodes");
            //console.log(codes);
            
            this.stock_codes = codes.map(function(d) {
                return {
                    code: d.code,
                    name: d.name
                };
            }).sort(function(a, b) { return d3.ascending(a.code, b.code); });  
            //console.log(stock_codes);
            return this.stock_codes;

        } catch (error) {
            console.log(error);
        }        
    }

    // get getStockCodes (){
    //     return this.query_stockcodes();
    // }

    // set setCode (code) {
    //     this._code=code
    // }

    async predict (code) {
        //data = await d3.json("/bridge/predict?code=" + code + "&data_from=20190818&data_to=20200819&n=250")
        let ohlc = await d3.json("/bridge/predict?code=" + code + "&data_from=20190818&data_to=20200819&n=250")
        console.log(ohlc)
        // https://velog.io/@daybreak/Javascript-map%ED%95%A8%EC%88%98
        this.stock_data.ohlc = ohlc.map(function(d) {
            //console.log(d);
            return {
                date: parseDate(d.date),
                open: +d.open, // convert open column to number
                high: +d.high,
                low: +d.low,
                close: +d.close,
                volume: +d.volume,
                //action: +d.action,
            };
        }).sort(function(a, b) { return d3.ascending(a.date, b.date); }); 
            
        return this.query_indicators(code)
    }

    async query_candle (code) {
        this.stock_data.code = code
        let ohlc = await d3.json("/bridge/stockcandles?code=" + code + "&n=250")
        //console.log(ohlc)
        this.stock_data.ohlc = ohlc.map(function(d) {
            //console.log(d);
            return {
                date: parseDate(d.date),
                open: +d.open, // convert open column to number
                high: +d.high,
                low: +d.low,
                close: +d.close,
                volume: +d.volume
            };
        }).sort(function(a, b) { return d3.ascending(a.date, b.date); });    
        //console.log(this.stock_data.ohlc)
        //return(this.stock_data.ohlc)    
        return this.query_indicators(code)
    }

    query_indicators (code) {
        //console.log(this.stock_data.ohlc)
        this.stock_data.trades = [
            { date: this.stock_data.ohlc[130].date, type: "buy", price: this.stock_data.ohlc[130].low, low: this.stock_data.ohlc[130].low, high: this.stock_data.ohlc[130].high },
            { date: this.stock_data.ohlc[150].date, type: "sell", price: this.stock_data.ohlc[150].high, low: this.stock_data.ohlc[150].low, high: this.stock_data.ohlc[150].high }
            //{ date: data[130].date, type: "buy", price: data[130].low, low: data[130].low, high: data[130].high }
            //{ date: data[170].date, type: "sell", price: data[170].low, low: data[170].low, high: data[170].high }
        ];
        
        this.stock_data.preroll = 33

        return this.stock_data
        
        //console.log(this.stock_data)
    
       // d3.select('div#chart').call(draw);
    }
}

class Chart{
    constructor(stock_data){
        this.stock_data=stock_data;

        // https://github.com/d3/d3-fetch/blob/v1.1.2/README.md#json
        // https://stackoverflow.com/questions/56539366/getting-data-using-d3-json-is-not-working-while-it-works-using-js-async-await
        // https://stackoverflow.com/questions/49768165/code-within-d3-json-callback-is-not-executed
        // https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/

        this.data = this.stock_data.ohlc;
            this.x = techan.scale.financetime();           
            this.y = d3.scaleLinear();
            this.yPercent = this.y.copy();
            let indicatorTop = d3.scaleLinear();
            this.indicatorTop = indicatorTop;
            this.yVolume = d3.scaleLinear(),
            this.candlestick = techan.plot.candlestick().xScale(this.x).yScale(this.y),
            this.sma0 = techan.plot.sma().xScale(this.x).yScale(this.y),
            this.sma1 = techan.plot.sma().xScale(this.x).yScale(this.y),
            this.ema2 = techan.plot.ema().xScale(this.x).yScale(this.y),
            this.volume = techan.plot.volume().accessor(this.candlestick.accessor()).xScale(this.x).yScale(this.yVolume),
            this.xAxis = d3.axisBottom(this.x),
            this.xAxisTop = d3.axisTop(this.x),
            this.timeAnnotation = techan.plot.axisannotation().orient('bottom').axis(this.xAxis).format(d3.timeFormat('%Y-%m-%d')).width(65),
            this.timeAnnotationTop = techan.plot.axisannotation().orient('top').axis(this.xAxisTop).format(d3.timeFormat('%Y-%m-%d')).width(65),
            this.yAxis = d3.axisRight(this.y),
            this.ohlcAnnotation = techan.plot.axisannotation().orient('right').axis(this.yAxis).format(d3.format(',.2f')),
            this.closeAnnotation = techan.plot.axisannotation().orient('right').accessor(this.candlestick.accessor()).axis(this.yAxis).format(d3.format(',.2f')),
            this.percentAxis = d3.axisLeft(this.yPercent).tickFormat(d3.format('+.1%')),
            this.percentAnnotation = techan.plot.axisannotation().orient('left').axis(this.percentAxis),
            this.volumeAxis = d3.axisRight(this.yVolume).ticks(3).tickFormat(d3.format(',.3s')),
            this.volumeAnnotation = techan.plot.axisannotation().orient('right').axis(this.volumeAxis).width(35),
            this.macdScale = d3.scaleLinear(),
            this.rsiScale = d3.scaleLinear(),
            this.macd = techan.plot.macd().xScale(this.x).yScale(this.macdScale),
            this.macdAxis = d3.axisRight(this.macdScale).ticks(3),
            this.macdAnnotation = techan.plot.axisannotation().orient('right').axis(this.macdAxis).format(d3.format(',.2s')),
            this.macdAxisLeft = d3.axisLeft(this.macdScale).ticks(3),
            this.macdAnnotationLeft = techan.plot.axisannotation().orient('left').axis(this.macdAxisLeft).format(d3.format(',.2s')),
            this.rsi = techan.plot.rsi().xScale(this.x).yScale(this.rsiScale),
            this.rsiAxis = d3.axisRight(this.rsiScale).ticks(3),
            this.rsiAnnotation = techan.plot.axisannotation().orient('right').axis(this.rsiAxis).format(d3.format(',.2s')),
            this.rsiAxisLeft = d3.axisLeft(this.rsiScale).ticks(3),
            this.rsiAnnotationLeft = techan.plot.axisannotation().orient('left').axis(this.rsiAxisLeft).format(d3.format(',.2s')),
            this.ohlcCrosshair = techan.plot.crosshair().xScale(this.x).yScale(this.y).xAnnotation([this.timeAnnotation, this.timeAnnotationTop]).yAnnotation([this.ohlcAnnotation, this.percentAnnotation, this.volumeAnnotation]),
            this.macdCrosshair = techan.plot.crosshair().xScale(this.x).yScale(this.macdScale).xAnnotation([this.timeAnnotation, this.timeAnnotationTop]).yAnnotation([this.macdAnnotation, this.macdAnnotationLeft]),
            this.rsiCrosshair = techan.plot.crosshair().xScale(this.x).yScale(this.rsiScale).xAnnotation([this.timeAnnotation, this.timeAnnotationTop]).yAnnotation([this.rsiAnnotation, this.rsiAnnotationLeft]),
            //trendline = techan.plot.trendline().xScale(x).yScale(y),
            //supstance = techan.plot.supstance().xScale(x).yScale(y).annotation([ohlcAnnotation, percentAnnotation]);
            //console.log(this);

            this.tradearrow = techan.plot.tradearrow()
                .xScale(this.x)
                .yScale(this.y)
                .y((d) => {
                    // Display the buy and sell arrows a bit above and below the price, so the price is still visible
                    if(d.type === 'buy') 
                        return this.y(d.low)+5;
                    if(d.type === 'sell') 
                        return this.y(d.high)-5;
                    else 
                        return this.y(d.price);
                });

        this.dim = {
            width: null, height: null,
            margin: { top: 25, right: 50, bottom: 25, left: 50 },
            plot: { width: null, height: null },
            ohlc: { height: null },
            indicator: { height: null, padding: null, top: null, bottom: null }
        };
    }

    chart (selection) {
        let svg = selection.append("svg"),
            defs = svg.append("defs");
    
        defs.append("clipPath")
            .attr("id", "ohlcClip")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0);
    
        // defs.append("clipPath")
        //     .attr("id", "supstanceClip")
        //     .append("rect")
        //     .attr("x", -dim.margin.left)
        //     .attr("y", 0);
    
        defs.selectAll(".indicatorClip").data([0, 1])
            .enter()
            .append("clipPath")
            .attr("id", function(d, i) { return "indicatorClip-" + i; })
            .attr("class", "indicatorClip")
            .append("rect")
            .attr("x", 0);
    
        svg.append('text')
            .attr("class", "version")
            .style("text-anchor", "end")
            .text("");
            //.text("TechanJS v" + techan.version + ", D3 v" + d3.version);
    
        svg = svg.append("g")
            .attr("class", "chart")
            .attr("transform", "translate(" + this.dim.margin.left + "," + this.dim.margin.top + ")");
    
        svg.append('text')
            .attr("class", "symbol")
            .attr("x", 5)
            .attr("y", 15)
            .text("symbol");
    
        svg.append("g")
            .attr("class", "x axis bottom");
    
        svg.append("g")
            .attr("class", "x axis top");
    
        let ohlcSelection = svg.append("g")
            .attr("class", "ohlc")
            .attr("transform", "translate(0,0)");
    
        ohlcSelection.append("g")
            .attr("class", "y axis");
    
        ohlcSelection.append("g")
            .attr("class", "closeValue annotation up");
    
        ohlcSelection.append("g")
            .attr("class", "volume")
            .attr("clip-path", "url(#ohlcClip)");
    
        ohlcSelection.append("g")
            .attr("class", "candlestick")
            .attr("clip-path", "url(#ohlcClip)");
    
        ohlcSelection.append("g")
            .attr("class", "indicator sma ma-0")
            .attr("clip-path", "url(#ohlcClip)");
    
        ohlcSelection.append("g")
            .attr("class", "indicator sma ma-1")
            .attr("clip-path", "url(#ohlcClip)");
    
        ohlcSelection.append("g")
            .attr("class", "indicator ema ma-2")
            .attr("clip-path", "url(#ohlcClip)");
    
        ohlcSelection.append("g")
            .attr("class", "percent axis");
    
        ohlcSelection.append("g")
            .attr("class", "volume axis");
    
        let indicatorSelection = svg.selectAll("svg > g.indicator").data(["macd", "rsi"]).enter()
            .append("g")
            .attr("class", function(d) { return d + " indicator"; });
    
        indicatorSelection.append("g")
            .attr("class", "axis right");
    
        indicatorSelection.append("g")
            .attr("class", "axis left");
    
        indicatorSelection.append("g")
            .attr("class", "indicator-plot")
            .attr("clip-path", function(d, i) { return "url(#indicatorClip-" + i + ")"; });
    
        // Add trendlines and other interactions last to be above zoom pane
        svg.append('g')
            .attr("class", "crosshair ohlc");
    
        svg.append("g")
            .attr("class", "tradearrow")
            .attr("clip-path", "url(#ohlcClip)");     
    
        svg.append('g')
            .attr("class", "crosshair macd");
    
        svg.append('g')
            .attr("class", "crosshair rsi");   
    
        // svg.append("g")
        //     .attr("class", "trendlines analysis")
        //     .attr("clip-path", "url(#ohlcClip)");
    
        // svg.append("g")
        //     .attr("class", "supstances analysis");
    
        //selection.call(draw);
    }
    
    resize (selection) {
        this.dim.width = selection.node().clientWidth;
        this.dim.height = selection.node().clientHeight;
        this.dim.plot.width = this.dim.width - this.dim.margin.left - this.dim.margin.right;
        this.dim.plot.height = this.dim.height - this.dim.margin.top - this.dim.margin.bottom;
        this.dim.ohlc.height = this.dim.plot.height * 0.67777777;
        this.dim.indicator.height = this.dim.plot.height * 0.144444;
        this.dim.indicator.padding = this.dim.plot.height * 0.01111111111;
        this.dim.indicator.top = this.dim.ohlc.height + this.dim.indicator.padding;
        this.dim.indicator.bottom = this.dim.indicator.top + this.dim.indicator.height + this.dim.indicator.padding;
    
        let xRange = [0, this.dim.plot.width],
            yRange = [this.dim.ohlc.height, 0],
            ohlcVerticalTicks = Math.min(10, Math.round(this.dim.height/70)),
            xTicks = Math.min(10, Math.round(this.dim.width/130));
    
        this.indicatorTop.range([this.dim.indicator.top, this.dim.indicator.bottom]);
        this.x.range(xRange);
        this.xAxis.ticks(xTicks);
        this.xAxisTop.ticks(xTicks);
        this.y.range(yRange);
        this.yAxis.ticks(ohlcVerticalTicks);
        this.yPercent.range(this.y.range());
        this.percentAxis.ticks(ohlcVerticalTicks);
        this.yVolume.range([yRange[0], yRange[0]-0.2*yRange[0]]);
        this.volumeAxis.ticks(Math.min(3, Math.round(this.dim.height/150)));
        this.timeAnnotation.translate([0, this.dim.plot.height]);
        this.ohlcAnnotation.translate([xRange[1], 0]);
        this.closeAnnotation.translate([xRange[1], 0]);
        this.macdScale.range([this.indicatorTop(0) + this.dim.indicator.height, this.indicatorTop(0)]);
        this.rsiScale.range([this.indicatorTop(1) + this.dim.indicator.height, this.indicatorTop(1)]);
        this.macdAnnotation.translate([xRange[1], 0]);
        this.rsiAnnotation.translate([xRange[1], 0]);
        this.ohlcCrosshair.verticalWireRange([0, this.dim.plot.height]);
        this.macdCrosshair.verticalWireRange([0, this.dim.plot.height]);
        this.rsiCrosshair.verticalWireRange([0, this.dim.plot.height]);

        selection.select("svg")
            .attr("width", this.dim.width)
            .attr("height", this.dim.height);
    
        selection.select("text.version")
            .attr("x", this.dim.width-5)
            .attr("y", this.dim.height);
    
        selection.selectAll("defs #ohlcClip > rect")
            .attr("width", this.dim.plot.width)
            .attr("height", this.dim.ohlc.height);
    
        // selection.selectAll("defs #supstanceClip > rect")
        //     .attr("width", this.dim.width)
        //     .attr("height", this.dim.ohlc.height);
    
        var that = this;
        selection.selectAll("defs .indicatorClip > rect")
            .attr("y", function (d, i) {
                //console.log(that)
                return that.indicatorTop(i);
            })
            .attr("width", this.dim.plot.width)
            .attr("height", this.dim.indicator.height);
    
        selection.select("g.x.axis.bottom")
            .attr("transform", "translate(0," +this. dim.plot.height + ")");
    
        selection.select("g.ohlc g.y.axis")
            .attr("transform", "translate(" + xRange[1] + ",0)");
    
        selection.selectAll("g.indicator g.axis.right")
            .attr("transform", "translate(" + xRange[1] + ",0)");
    
        selection.selectAll("g.indicator g.axis.left")
            .attr("transform", "translate(" + xRange[0] + ",0)");
    }    
    
    draw (selection) {    
        let svg = selection.select("svg");
        
        let accessor = this.candlestick.accessor(),
            indicatorPreRoll = this.stock_data.preroll,
            postRollData = this.data.slice(indicatorPreRoll);  // Don't show where indicators don't have data
    
        this.x.domain(techan.scale.plot.time(this.data).domain());
        this.y.domain(techan.scale.plot.ohlc(postRollData).domain());
        this.yPercent.domain(techan.scale.plot.percent(this.y, accessor(this.data[indicatorPreRoll])).domain());
        this.yVolume.domain(techan.scale.plot.volume(postRollData).domain());
    
        let macdData = techan.indicator.macd()(this.data);
        this.macdScale.domain(techan.scale.plot.macd(macdData).domain());
        let rsiData = techan.indicator.rsi()(this.data);
        this.rsiScale.domain(techan.scale.plot.rsi(rsiData).domain());
    
        // var trades = [
        //     { date: data[130].date, type: "buy", price: data[130].low, low: data[130].low, high: data[130].high },
        //     { date: data[150].date, type: "sell", price: data[150].high, low: data[150].low, high: data[150].high }
        //     //{ date: dathis.ta[130].date, type: "buy", price: data[130].low, low: data[130].low, high: data[130].high }
        //     //{ date: data[170].date, type: "sell", price: data[170].low, low: data[170].low, high: data[170].high }
        // ];
    
        svg.select("text.symbol").text(this.stock_data.name);
    
        svg.select("g.candlestick").datum(this.data).call(this.candlestick);
        svg.select("g.closeValue.annotation").datum([this.data[this.data.length-1]]).call(this.closeAnnotation);
        svg.select("g.volume").datum(this.data).call( this.volume);
        svg.select("g.sma.ma-0").datum(techan.indicator.sma().period(10)(this.data)).call(this.sma0);
        svg.select("g.sma.ma-1").datum(techan.indicator.sma().period(20)(this.data)).call(this.sma1);
        svg.select("g.ema.ma-2").datum(techan.indicator.ema().period(50)(this.data)).call(this.ema2);
        svg.select("g.macd .indicator-plot").datum(macdData).call(this.macd);
        svg.select("g.rsi .indicator-plot").datum(rsiData).call(this.rsi);
    
        svg.select("g.crosshair.ohlc").call(this.ohlcCrosshair);
        svg.select("g.crosshair.macd").call(this.macdCrosshair);
        svg.select("g.crosshair.rsi").call(this.rsiCrosshair);
        // svg.select("g.trendlines").datum(stock_data.trendlines).call(this.trendline).call(trendline.drag);
        // svg.select("g.supstances").datum(stock_data.supstances).call(this.supstance).call(supstance.drag);
        svg.select("g.tradearrow").datum( this.stock_data.trades).call(this.tradearrow);
    
        this.x.zoomable().domain([indicatorPreRoll, this.data.length]); // Zoom in a little to hide indicator preroll
        this.resize(selection);
    
        svg.select("g.x.axis.bottom").call(this.xAxis);
        svg.select("g.x.axis.top").call(this.xAxisTop);
        svg.select("g.ohlc .axis").call(this.yAxis);
        svg.select("g.volume.axis").call(this.volumeAxis);
        svg.select("g.percent.axis").call(this.percentAxis);
        svg.select("g.macd .axis.right").call(this.macdAxis);
        svg.select("g.rsi .axis.right").call(this.rsiAxis);
        svg.select("g.macd .axis.left").call(this.macdAxisLeft);
        svg.select("g.rsi .axis.left").call(this.rsiAxisLeft);
    
        // We know the data does not change, a simple refresh that does not perform data joins will suffice.
        svg.select("g.candlestick").call(this.candlestick.refresh);
        svg.select("g.closeValue.annotation").call(this.closeAnnotation.refresh);
        svg.select("g.volume").call(this.volume.refresh);
        svg.select("g .sma.ma-0").call(this.sma0.refresh);
        svg.select("g .sma.ma-1").call(this.sma1.refresh);
        svg.select("g .ema.ma-2").call(this.ema2.refresh);
        svg.select("g.macd .indicator-plot").call(this.macd.refresh);
        svg.select("g.rsi .indicator-plot").call(this.rsi.refresh);
        svg.select("g.crosshair.ohlc").call(this.ohlcCrosshair.refresh);
        svg.select("g.crosshair.macd").call(this.macdCrosshair.refresh);
        svg.select("g.crosshair.rsi").call(this.rsiCrosshair.refresh);
        // svg.select("g.trendlines").call(this.trendline.refresh);
        // svg.select("g.supstances").call(this.supstance.refresh)
        //    .selectAll("g.data .supstance").attr("clip-path", "url(#ohlcClip)"); // FIXME Component should do the clipping, too much internal knowledge here
        svg.select("g.tradearrow").call(this.tradearrow.refresh);
    }
}
