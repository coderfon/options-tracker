export const ObjectListToCsv = (list) => {
    return "data:text/csv;charset=utf-8,"
        + "id,date,ticker,type,action,strike,lastPrice,expiration,contracts,premium,currency,conversionRate,commission,campaign\n"
        + list.map(o => o.id + ","
            + o.date + ","
            + o.ticker + ","
            + o.type + ","
            + o.action + ","
            + o.strike + ","
            + o.lastPrice + ","
            + o.expiration + ","
            + o.contracts + ","
            + o.premium + ","
            + o.currency + ","
            + o.conversionRate + ","
            + o.commission + ","
            + o.campaign
        ).join('\n');
}

export const CsvToObjectList = (text) => {
    const csvHeader = text.slice(0, text.indexOf("\n")).split(",");
    const csvRows = text.slice(text.indexOf("\n")).split("\n").filter(n => n);

    const array = csvRows.map(row => {

        const ints = ["id", "contracts","date","expiration"];
        const floats = ["commission", "conversionRate", "lastPrice", "premium", "strike"];
        

        const values = row.split(',');
        const obj = csvHeader.reduce((object, header, index) => {
            if(ints.includes(header)) {
                object[header] = parseInt(values[index]);
            }
            else if(floats.includes(header)) {
                object[header] = parseFloat(values[index]);
            }
            else {
                object[header] = values[index];
            }
            
            return object;
          }, {});
          return obj;
    });

    return (array);
}