import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { categories } from './../data/category'

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#fff',
		},
	},
})

export default function Header({ word, setWord, category, setCategory }) {
	const handleSelectChange = (language) => {
		setCategory(language)
	}
	return (
		<HeaderContainer>
			<Title>{word ? word : 'Word Hunt'}</Title>
			<Inputs>
				<ThemeProvider theme={darkTheme}>
					<SearchInput
						id="standard-basic"
						label="Search a Word"
						onChange={(e) => setWord(e.target.value)}
						value={word}
					/>
					<SelectInput
						select
						label="Language"
						value={category}
						onChange={(e) => handleSelectChange(e.target.value)}
					>
						{categories.map((option) => (
							<MenuItem key={option.label} value={option.label}>
								{option.value}
							</MenuItem>
						))}
					</SelectInput>
				</ThemeProvider>
			</Inputs>
		</HeaderContainer>
	)
}

const Title = styled.span`
	font-size: 7vw;
	text-transform: uppercase;
	font-family: 'Montserrat', sans-serif;
`

const Inputs = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`

const SearchInput = styled(TextField)`
	&& {
		width: 43%;
	}
`

const SelectInput = styled(SearchInput)``

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 35vh;
	width: 100%;

	@media (max-width: 900px) {
		height: 25vh;

		${Title} {
			font-size: 11vw;
		}
	}
`
