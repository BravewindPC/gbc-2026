// enum Round {
//     Round64 = "Round64",
//     Round32 = "Round32",
//     Round16 = "Round16",
//     QuarterFinal = "QuarterFinal",
//     SemiFinal = "SemiFinal",
//     Final = "Final",
// }

// enum Type {
//     MixedDouble = "MixedDouble",
//     MenDouble = "MenDouble",
//     MenSingle = "MenSingle",
// }

// enum Organization {
//     FITB = "FITB",
//     FMIPA = "FMIPA",
//     FSRD = "FSRD",
//     FTI = "FTI",
//     FTMD = "FTMD",
//     FTTM = "FTTM",
//     FTSL = "FTSL",
//     SAPPK = "SAPPK",
//     SBM = "SBM",
//     SF = "SF",
//     SITH = "SITH",
//     STEI = "STEI",
// }

// enum Winner {
//     Players1 = "players1",
//     Players2 = "players2",
// }

// // interface Score {
// //     set1: Point;
// //     set2: Point;
// //     set3?: Point; // Assuming the third set might be optional
// // }

// interface Score {
//     player1: number;
//     player2: number;
// }

// interface Match {
//     id: string;
//     round?: Round;
//     type?: Type;
//     date?: Date;
//     score?: Score[];
//     umpire?: string;
//     players1: string[];
//     players2: string[];
//     organization?: Organization;
//     winners?: Winner;
// }
