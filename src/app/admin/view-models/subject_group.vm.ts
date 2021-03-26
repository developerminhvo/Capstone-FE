import { EntryMark } from "./entry_mark.vm";

export interface SubjectGroupRM {
    id?: number,
    groupCode?: string, 
    name?: string,       
    status?: number,
    isDeleted?: boolean,
    entryMarks?: EntryMark[]
}