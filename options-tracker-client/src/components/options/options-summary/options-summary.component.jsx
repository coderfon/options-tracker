

const OptionsSummary = (props) => {
    return (
        <div>
            <div>
                <span>Total Operations: {props.summary.totalOperations}</span>
            </div>
            <div>
                Total Campaigns: {props.summary.totalCampaigns}
            </div>
            <div>
                Total: {props.summary.totalOneCurrency.toFixed(2)}
            </div>
            <div>
                Total Base Currency: {props.summary.totalBaseCurrency.toFixed(2)}
            </div>
        </div>
    );
}

export default OptionsSummary