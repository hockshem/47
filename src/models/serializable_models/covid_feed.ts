import Serializable from "./serializable";

export default class CovidFeed implements Serializable<CovidFeed>{
    countryName?: string;
    totalCases?: string;
    newCases?: string;
    activeCases?: string;
    totalDeaths?: string;
    newDeaths?: string;
    totalRecovered?: string;
    seriousCritical?: string;
    recordDate?: string;

    // TODO: Add cases converter and automate the process.
    deserialize(jsonInput: any): CovidFeed {
        console.log(jsonInput);
        this.countryName = jsonInput.country_name || "-";
        this.totalCases = jsonInput.total_cases || "None";
        this.newCases = jsonInput.new_cases || "None";
        this.activeCases = jsonInput.active_cases || "None";
        this.totalDeaths = jsonInput.total_deaths || "None";
        this.newDeaths = jsonInput.new_deaths || "None";
        this.totalRecovered = jsonInput.total_recovered || "None";
        this.seriousCritical = jsonInput.serious_critical || "None";
        this.recordDate = jsonInput.record_date || "-";
        return this;
    }
}