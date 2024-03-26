import React, { useCallback, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native"
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton
} from "./styles"
import { HighlightCard } from "../../components/HighlightCard"
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard"

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighlightProps {
    amount: string
    lastTransation: string
}

interface HighlightData {
    entries: HighlightProps
    expensives: HighlightProps
    total: HighlightProps
}

export default function Dashboard() {
    const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
    const [ highlightData, setHighlightData ] = useState<HighlightData>({} as HighlightData);

    function getLastTransactionDate(
        collection: DataListProps[], 
        type: 'positive' | 'negative'
    ) {
        const colectionFilttered = collection
        .filter(transaction => transaction.type === type)

        if(colectionFilttered.length === 0) {
            return 0
        }

        const lastTransaction = new Date(
            Math.max.apply(Math, colectionFilttered
            .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
    }

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : []

        let entriesTotal = 0
        let expensiveTotal = 0

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            
            if(item.type === 'positive') {
                entriesTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        })

        setTransactions(transactionsFormatted)

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
        
        const totalInterval = lastTransactionExpensives === 0 
        ? 'Não há transações' 
        : `01 a ${lastTransactionExpensives}`

        const total = entriesTotal - expensiveTotal

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransation: lastTransactionEntries === 0 
                ? 'Não há transações' 
                : `Última entrada dia ${lastTransactionEntries}`
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransation: lastTransactionExpensives === 0 
                ? 'Não há transações' 
                : `Última saída dia ${lastTransactionExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransation: totalInterval
            }
        });
    }

    useEffect(() => {
        loadTransactions()
    },[])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    },[]))

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/148268930?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Silas</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                        <HighlightCard 
                            type="up"
                            title="Entradas" 
                            amount={highlightData.entries?.amount}
                            lastTransation={highlightData.entries?.lastTransation}
                        />
                        <HighlightCard
                            type="down" 
                            title="Saídas" 
                            amount={highlightData.expensives?.amount} 
                            lastTransation={highlightData.expensives?.lastTransation}
                        />
                        <HighlightCard
                            type="total" 
                            title="Total" 
                            amount={highlightData.total?.amount} 
                            lastTransation={highlightData.total?.lastTransation}
                        />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList 
                    data={transactions}
                    keyExtractor={(item: { id: any }) => item.id}
                    renderItem={({ item }: any) => <TransactionCard data={item} />}
                />
                
            </Transactions>
        </Container>
    )
}