import { Module } from "@nestjs/common";
import { AccountsProvider } from "./accounts.provider";

import { UsersProvider } from "./users.provider";

@Module({
    providers:[
        ...UsersProvider,
        ...AccountsProvider
        
    ],
    exports:[
        ...UsersProvider,
        ...AccountsProvider   
    ]
})
export class ProvidersModule { }
