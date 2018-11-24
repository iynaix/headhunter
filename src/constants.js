const leagueVariants = league =>
    league === "Standard" ? ["Standard", "Hardcore"] : [league, `HC ${league}`]

export const LEAGUES = [...leagueVariants("Delve"), ...leagueVariants("Standard")]
