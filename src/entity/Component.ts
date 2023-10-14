import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Component {

    @PrimaryGeneratedColumn()
    id : number

    @Column({unique : true})
    Code : number

    @Column()
    Indice : number

    @Column()
    SKU : String

    @Column()
    Description : string

    @Column({ type: 'double precision' })
    Price : number

    @Column()
    Quantity : number


}