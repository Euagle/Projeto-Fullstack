import { UserDataBase } from "../database/UserDataBase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dto/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenPayload, TUser } from "../types";
import { User } from "../models/User";
import {USER_ROLES} from "../types"
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
    constructor(
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
    public createUsers = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    
            const {  nick_name, email, password } = input
            
    
            if ( !nick_name || !email || !password ) {
                throw new BadRequestError("Dados inválidos")
            }
    
            if (nick_name !== undefined) {
    
                if (typeof nick_name !== "string") {
                    throw new BadRequestError("'name' deve ser string")
                    }
                }
            if (email !== undefined) {
    
                if (typeof email !== "string") {
                    throw new BadRequestError("'email' deve ser string")
                    }
                }
    
            if (password !== undefined) {
    
                if (typeof password !== "string") {
                    throw new BadRequestError("'password' deve ser string")
                    }
                }
            
            const hashPassword = await this.hashManager.hash(password as string)
            
    
    
            const emailExists = await this.userDataBase.findPostUserEmail(email as string)
    
            if (emailExists) {
                throw new BadRequestError("'email' do usuário já existe")
            }
    
            if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                throw new BadRequestError("Parâmetro 'email' inválido")
            }
    
            const userInstance = new User(
                this.idGenerator.generate(),
                nick_name,
                email,
                hashPassword,
                USER_ROLES.NORMAL,
                new Date().toISOString()
            )
    
    
            const newUser : TUser =  {
                id: userInstance.getId(),
                nick_name: userInstance.getName(),
                email: userInstance.getEmail(),
                password: userInstance.getPassword(),
                role: userInstance.getRole(),
                created_at: userInstance.getCreatedAt()

            }
            
    
            await this.userDataBase.insertPostUser(newUser)

            const token = this.tokenManager.createToken(newUser)

            const output : SignupOutputDTO={
                token: token
            }

            return (output)
    }

    public createUsersLogin = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        
        const { email, password} = input
    
            if ( !email || !password ) {
                throw new BadRequestError("Dados inválidos")
            }
    
         
            if (email !== undefined) {
    
                if (typeof email !== "string") {

                    throw new BadRequestError("'email' deve ser string")
                    }
                }
    
            if (password !== undefined) {
    
                if (typeof password !== "string") {
                    throw new BadRequestError("'password' deve ser string")
                    }
                }
            
                
                const emailExists: TUser | undefined = await this.userDataBase.findPostUserEmail(email as string)
    
                if (!emailExists) {
                    throw new BadRequestError("email incorreto")
                }
        
                if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                    throw new BadRequestError("Parâmetro 'email' inválido")
                }
    

            
    

            const userInstance = new User(
                emailExists.id,
                emailExists.nick_name,
                emailExists.email,
                emailExists.password,
                emailExists.role,
                emailExists.created_at
            )
    
            const hashedPassaword = userInstance.getPassword()

            
            const passwordHash = await this.hashManager
            .compare(password, hashedPassaword)
            

            if(!passwordHash){
                throw new BadRequestError("Password incorreto")
            }
            
            
            const newUser: TokenPayload = {
                id: userInstance.getId(),
                nick_name: userInstance.getName(),
                role: userInstance.getRole()
            }

            const token = this.tokenManager.createToken(newUser)
    

            const output : LoginOutputDTO ={
               token
            }

            return (output)
    }

    public getUsers = async () => {
        
    
           const result = await this.userDataBase.findGetUsers()
    
            const users: User[] = result.map((result)=>
            new User(
              result.id,
              result.nick_name,
              result.email,
              result.password,
              result.role,
              result.created_at  
            )
            )
            return({
                users: users
            })
    }
    }
