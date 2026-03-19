import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "Username do not exist" })
    username: string;

    @IsNotEmpty({ message: "Password do not exist" })
    password: string;
}
