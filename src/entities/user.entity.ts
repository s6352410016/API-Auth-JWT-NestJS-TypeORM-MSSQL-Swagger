import { Entity , Column , CreateDateColumn , UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("nvarchar")
    fullname: string;

    @Column("nvarchar")
    username: string;

    @Column("nvarchar")
    password: string;

    @Column("nvarchar")
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}