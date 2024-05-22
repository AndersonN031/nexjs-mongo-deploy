import User from "@/models/user"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/libs/mongodb";
import bcrypt from "bcryptjs"

// Criando uma autenticação com NextAuth
const options = NextAuth({
    // definindo os provedores de autenticação
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            async authorize(credentials) {
                await connectDB();

                try {
                    // Buscando o usuário no banco de dados usando o email e a senha
                    const user = await User.findOne({
                        email: credentials.email,
                    })

                    // Se o usuário for encontrado
                    if (user) {
                        // Comparando a senha fornecida com a senha armazenada no banco de dados
                        const validPassword = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        // Se as senhas forem iguais, retorna o usuário
                        if (validPassword) {
                            return user;
                        } else {
                            throw new Error("Usuário ou senha inválidos!");
                        }

                    } else {
                        throw new Error("Usuário ou senha inválidos!");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        })
    ],
    // Definindo a página de erro
    pages: {
        error: "/login",
    }
});

export { options as GET, options as POST } 