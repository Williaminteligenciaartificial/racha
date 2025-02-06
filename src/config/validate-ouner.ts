export const protectAcountOuner = (
     ownerUserId: string,
     sessionUserId:string

    )=> {
        if(ownerUserId !== sessionUserId) {
            return false;

        }
        return true;
    };
     