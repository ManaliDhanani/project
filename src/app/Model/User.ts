export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _expiresIn: Date,
        public displayName: string
    ){}
    get token(){
        if(!this._expiresIn || this._expiresIn < new Date()){
            return null;
        }
        return this._token;
    }
}