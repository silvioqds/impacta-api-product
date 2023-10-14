import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    Code: number

    @Column()
    Name: string
    
}
