//--------------------------
// Sample data (leave as-is)
//--------------------------
const data = [
    {
        "id": "3cc51cfd-6e3c-41eb-9604-362da3a6fb64",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.98,
        "quantity": 2000,
        "currency": "USD"
    },
    {
        "id": "0572be22-d790-460e-bf03-8ee1b3b19dad",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.9,
        "quantity": 1500,
        "currency": "USD"
    },
    {
        "id": "8f356500-de35-4378-b7a3-5c587da54cd5",
        "symbol": "AAPL",
        "companyName": "Apple",
        "price": 174.78,
        "quantity": 500,
        "currency": "USD"
    },
    {
        "id": "5f92c4c3-b6b9-4538-9e80-d587217e8410",
        "symbol": "VOD",
        "price": 130.02,
        "quantity": 3290,
        "currency": "GBP"
    },
    {
        "id": "00000000-0000-0000-0000-000000000000",
        "symbol": "XXX",
        "price": 99.99,
        "quantity": 100,
        "currency": "GBP"
    },
    {
        "id": "155ac33b-05c4-42f7-a446-0b7ffacf2504",
        "symbol": "VOD",
        "price": 128.91,
        "quantity": 8500,
        "currency": "GBP"
    }
];


//----------------------
// The method to improve.
// Submit a revised version of this function below, making any changes
// you believe improve the code while satisfying the requirements above.
//----------------------

// DONE
// 1) check that top of returned object includes
//     count of all valid trades
//     aggregate of total costs of trades per currency
//     unique array of all symbols traded
// 2) output includes all trade objects within a nested Array
// 3) add error handling for trades missing "companyName" field. 
//      if missing companyName, use "symbol"
// 4) Drop test cases with ID containing all zeroes
//      log message to console when test trades identified

// CHANGES
// 1) Modularized removeBadTrades
// 2) added more descriptive variable names
// 3) Removed bad trade total from currency total

function doProcesstrades(ddata) {
    var result = {},
        tradesret = [],
        count = null;
    for (let i = 0; i < ddata.length; i++) {
        var currentTrade = ddata[i];
        count = !count ? 1 : (count + 1);

        // 1) add up prices
        if (!result["total" + currentTrade.currency]) {
            result["total" + currentTrade.currency] = currentTrade.price * currentTrade.quantity
        } else {
            result["total" + currentTrade.currency] = result["total" + currentTrade.currency] + currentTrade.price * currentTrade.quantity
        }

        // 2) collect unique symbols
        if (!result.symbols) result.symbols = [];
        if (result.symbols.indexOf(currentTrade.symbol) < 0) {
            result.symbols = result.symbols.concat([currentTrade.symbol])
        }

        // 3) handle missing names
        if (currentTrade.companyName === '' || currentTrade.companyName === null || currentTrade.companyName === undefined) {
            currentTrade.companyName = currentTrade['symbol'] || '???????'
        }

        // 4) add trade to returned array
        tradesret = tradesret.concat(currentTrade)
    }

    result.tradeCount = count;
    result.trades = tradesret;

    // remove bad trades from result
    return removeBadTrades(result);
}

function removeBadTrades(result) {
    // 5) remove bad trades - be sure to fix count if neeeded
    var removed = 0
    for (let i = 0; i < result.trades.length; i++) {
        if (result.trades[i].id == '00000000-0000-0000-0000-000000000000') {
            console.error(`Bad trade removed ${result.trades[i].symbol}`);
            removed++;
            // remove bad trade from currency total in result
            let badTrade = result.trades[i];
            result["total" + badTrade.currency] -= badTrade.price * badTrade.quantity;
            // remove bad trade from symbols list in result
            let badTradeSym = result.trades[i].symbol;
            result.symbols.splice(result.symbols.indexOf(badTradeSym), 1);
            result.trades.splice(i, 1);
        }
        result.tradeCount = result.tradeCount - removed;
    }
    return result;
}
