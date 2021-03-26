export interface UniversityRM {
    id?: number,
    code?: string,
    name?: string,
    address?: string,
    logoUrl?: string,
    information?: string,
    description?: string,
    tuition?: string,
    tuitionType?: number,
    tuitionFrom?: number,
    tuitionTo?: number,
    phone?: string,
    webUrl?: string,
    majorDetail?: unknown[],
    tests?: unknown[],
    rating?: unknown, 
    status?: unknown   
}

export interface UniversityCM {    
    code?: string,
    name?: string,
    address?: string,
    logo?: string | File,
    information?: string,
    description?: string,
    tuition?: string,
    phone?: string,
    webUrl?: string,       
}