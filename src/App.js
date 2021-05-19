import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Container, Switch, withStyles } from '@material-ui/core'
import Header from './components/Header'
import styled from 'styled-components'
import Definitions from './components/Definitions'
import { grey } from '@material-ui/core/colors'

const DarkMode = withStyles({
	switchBase: {
		color: grey[300],
		'&$checked': {
			color: grey[500],
		},
		'&$checked + $track': {
			backgroundColor: grey[500],
		},
	},
	checked: {},
	track: {},
})(Switch)

function App() {
	const [word, setWord] = useState('')
	const [meanings, setMeanings] = useState([])
	const [category, setCategory] = useState('en')
	const [darkMode, setDarkMode] = useState(true)
	const [apiError, setApiError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const fetchDictionary = async () => {
		try {
			const { data } = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
			)
			setApiError(false)
			setMeanings(data)
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
			//console.log(data)
		} catch (error) {
			setApiError(true)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setApiError(false)
		setIsLoading(true)
		fetchDictionary()
	}, [word, category])

	return (
		<AppContainer darkMode={darkMode}>
			<DarkModeContainer>
				<span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
				<DarkMode
					checked={darkMode}
					onChange={() => setDarkMode(!darkMode)}
				/>
			</DarkModeContainer>
			<ContentContainer maxWidth="md">
				<Header
					word={word}
					setWord={setWord}
					category={category}
					setCategory={setCategory}
				/>

				{meanings && (
					<Definitions
						word={word}
						category={category}
						meanings={meanings}
						apiError={apiError}
						isLoading={isLoading}
					/>
				)}
			</ContentContainer>
		</AppContainer>
	)
}

export default App

const AppContainer = styled.div`
	height: 100vh;
	background-color: ${({ darkMode }) => (darkMode ? '#282c34' : '#fff')};
	color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
	transition: all 0.5s linear;
`
const ContentContainer = styled(Container)`
	&& {
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: space-evenly;
	}
`

const DarkModeContainer = styled.div`
	position: absolute;
	top: 0;
	right: 15px;
`
