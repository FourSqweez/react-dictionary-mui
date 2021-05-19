import styled from 'styled-components'

export default function Definitions({
	word,
	category,
	meanings,
	apiError,
	isLoading,
}) {
	return (
		<MeaningsContainer>
			<div>
				{meanings[0] && word && category === 'en' && (
					<Audio
						controls
						src={
							meanings[0].phonetics[0] && meanings[0].phonetics[0].audio
						}
					>
						Your browser does not support the audio element.
					</Audio>
				)}
			</div>

			{word === '' ? (
				<Subtitle>Start by typing a word in Search</Subtitle>
			) : isLoading ? (
				<div>Loading...</div>
			) : apiError ? (
				<>
					<h1>Sorry!! No Definitions Found</h1>
					<h2>
						Something wrong with this language API, You can select another
						language or try the search again at later time or head to the
						web instead.
					</h2>
				</>
			) : meanings ? (
				meanings.map((mean) =>
					mean.meanings.map((item) =>
						item.definitions.map((def) => (
							<SingleMean>
								<b>{def.definition}</b>
								<Hr />
								{def.example && (
									<span>
										<b>Example : </b> {def.example}
									</span>
								)}
								{def.synonyms && (
									<span>
										<b>Synonym : </b>
										{def.synonyms.map((s) => `${s}, `)}
									</span>
								)}
							</SingleMean>
						))
					)
				)
			) : (
				'No Definitions Found'
			)}
		</MeaningsContainer>
	)
}

const Subtitle = styled.span`
	font-size: 5vw;
	font-family: 'Montserrat', sans-serif;
`

const SingleMean = styled.div`
	background-color: white;
	color: black;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	padding: 10px 20px;
	margin: 10px 0;
`
const Hr = styled.hr`
	background-color: black;
	width: 100%;
`

const MeaningsContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 55vh;
	border: 10px solid rgb(105, 105, 105);
	border-radius: 10px;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 10px 20px;
	/* Works on Firefox */
	scrollbar-width: thin;
	scrollbar-color: blue orange;

	/* Works on Chrome, Edge, and Safari */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #000;
	}

	::-webkit-scrollbar-thumb {
		background-color: gray;
		border-radius: 20px;
	}

	@media (max-width: 900px) {
		height: 60vh;
	}
`
const Audio = styled.audio`
	background-color: #fff;
	border-radius: 10px;
	width: 100%;
`
