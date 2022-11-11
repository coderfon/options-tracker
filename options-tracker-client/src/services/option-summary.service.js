export const CalculateSummary = (options) => {
    let summary = {};
    summary.totalOperations = options.length;
    summary.totalCampaigns = [...new Set(options.map(o => o.campaign))].length;
    summary.totalOneCurrency = 0;

    if([...new Set(options.map(o => o.currency))].length === 1) {
        summary.totalOneCurrency = options.reduce(
            (accumulator, currentO) => accumulator + CalculateOptionNet(currentO), 0
        );
    }

    summary.totalBaseCurrency = options.reduce(
        (accumulator, currentO) => accumulator + CalculateOptionBaseNet(currentO), 0
    );

    return summary;
}

export const CalculateCampaignSummary = (options) => {
    let summary = {};

    if(options.length > 0) {
        summary.totalDays = (options[options.length - 1].expiration - options[options.length - 1].date) / 86400000;

        /*
        if([...new Set(options.map(o => o.contracts))].length === 1) {
            summary.totalOneCurrency = options.reduce(
                (accumulator, currentO) => accumulator + CalculateOptionNet(currentO), 0
            );
        }
        */
    }
}

export const CalculateOptionNet = (option) => {
    return (option.premium * option.contracts * option.contractSize * (option.action === "sell" ? 1 : -1) - option.commission);
}

export const CalculateOptionBaseNet = (option) => {
    return (CalculateOptionNet(option) / option.conversionRate);
}