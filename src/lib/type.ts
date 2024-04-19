export interface Member {
    id: string;
    groupId: string;
    name: string | null;
    organization: string;
    matchResult: MatchResult;
}
  
export interface MatchResult {
    id: string;
    groupMembershipId: string;
    played: number;
    win: number;
    lose: number;
    setWin: number;
    setLose: number;
    scoreGain: number;
    scoreLose: number;
    points: number;
}

export interface GroupData {
    id: string;
    type: string;
    members: Member[];
}

export interface Match {
    id: string;
    number: number | null;
    round?: Round | null;
    group?: number | null;
    type?: Type | null;
    court?: number | null;
    live?: Boolean | null;
    dateStart?: Date | null;
    dateEnd?: Date | null;
    score1: number[];
    score2: number[];
    umpire?: string | null;
    players1: string;
    players2: string;
    organization1?: Organization | null;
    organization2?: Organization | null;
    winners?: Organization | null;
}

export enum Round {
    Group = "Group",
    Round16 = "Round16",
    QuarterFinal = "QuarterFinal",
    SemiFinal = "SemiFinal",
    Final = "Final",
}

enum Type {
    MixedDouble,
    MenDouble,
    MenSingle
}

export enum Organization {
    HIMATIKA = "HIMATIKA",
    TPB_FMIPA = "TPB FMIPA",
    KMPN = "KMPN",
    HIMATEK = "HIMATEK",
    HMS = "HMS",
    HIMASTRON = "HIMASTRON",
    HIMA_TG = 'HIMA TG "TERRA"',
    HMTG_GEA = 'HMTG "GEA"',
    TPB_FTMD = "TPB FTMD",
    HMH_SELVA = 'HMH "SELVA"',
    IMMG = "IMMG",
    HME = "HME",
    HMIF = "HMIF",
    TPB_SF ="TPB SF",
    TPB_FTI = "TPB FTI",
    TPB_FITB = "TPB FITB",
    TPB_FTTM = "TPB FTTM",
    HMFT = "HMFT",
    HMO_TRITON = 'HMO "TRITON"',
    KMKL = "KMKL",
    HMME = 'HMME "ATMOSPHAIRA"',
    TPB_SITH_S = "TPB SITH-S",
    HMTL = "HMTL",
    HMT = "HMT",
    TPB_STEI = "TPB STEI",
    TPB_SBM = "TPB SBM",
    TPB_FTSL = "TPB FTSL",
    MTI = "MTI",
    HMTM_PATRA = 'HMTM "PATRA"',
    IMA_G = "IMA-G",
    HMK_AMISCA = 'HMK "AMISCA"',
    HMF = 'HMF "ARS PRAEPARANDI"',
    HMRH = "HMRH",
    HMP_PL = "HMP PL",
    TPB_SITH_R = "SITH-R"
  }