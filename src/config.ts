/*
Controls AI configuration for Screeps.
*/

interface IConfiguration {
    readonly defendWeight?: number;
    readonly destroyWeight?: number;
    readonly expandWeight?: number;
    readonly gatherEnergyWeight?: number;
    readonly gatherMineralsWeight?: number;
    readonly name: string;
    readonly stayLocalWeight?: number;
    readonly targetedUsers?: ReadonlyArray<string>;
}

const configuration = (desiredPreset = "balanced"): IConfiguration => {
    const baseConfiguration: IConfiguration = {
        defendWeight: 0,
        destroyWeight: 0,
        expandWeight: 0,
        gatherEnergyWeight: 0,
        gatherMineralsWeight: 0,
        name: "balanced",
        stayLocalWeight: 0,
        targetedUsers: [],
    };

    const presets: ReadonlyArray<IConfiguration> = [
        {
            name: "aggressive",
        },
        {
            name: "defensive",
        },
    ];

    return { ...baseConfiguration, ...presets.find((preset) => {
        return preset.name === desiredPreset;
    })};
};

export  { configuration };
