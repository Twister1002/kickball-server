export class CreatePlayerDTO {
    public firstName: string;
    public lastName: string;    
}

export class UpdatePlayerDTO {
    public playerId: number;
    public firstName: string;
    public lastName: string; 
}