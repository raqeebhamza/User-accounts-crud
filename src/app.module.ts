import { Module } from "@nestjs/common";
import { DBModule } from "./db/db.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [    
        UserModule,
        DBModule
    
    ],
  })
  export class AppModule {}
  