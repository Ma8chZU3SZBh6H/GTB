function successful(data:any) {
    return {
        successful: true,
        payload: data ?? true
    }
}

function failed(data:any){
    return {
        successful: false,
        payload: data ?? null
    }
}

function failIfNull(data:any){
    if (data){
        return successful(data);
    }
    else{
        return failed(data);
    }
}

const response = {
    successful,
    failed,
    failIfNull
}

export default response;