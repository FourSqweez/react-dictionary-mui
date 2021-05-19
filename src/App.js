import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Container } from '@material-ui/core'
import Header from './components/Header'
import styled from 'styled-components'

function App() {
	const [word, setWord] = useState('')
	const [meanings, setMeanings] = useState([])
	const [category, setCategory] = useState('en')

	const fetchDictionary = async () => {
		try {
			const { data } = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
			)
			setMeanings(data)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchDictionary()
	}, [word, category])
	
	return (
		<AppContainer>
			<ContentContainer maxWidth="md">
				<Header
					word={word}
					setWord={setWord}
					category={category}
					setCategory={setCategory}
				/>
			</ContentContainer>
		</AppContainer>
	)
}

export default App

const AppContainer = styled.div`
	height: 100vh;
	background-color: #282c34;
	color: white;
`
const ContentContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	height: 100vh;
`
