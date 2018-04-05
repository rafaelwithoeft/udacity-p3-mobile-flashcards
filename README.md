TabsNavigator => [
  ListDeck
  NewDeck
  StackNavigator => [
    DetailDeck
    NewQuestion
    Quiz
  ]
]

DetailDeck, ação dentro da lista de decks.
NewQuestion, ação dentro dos detalhes do deck.
Quiz, ação dentro dos detalhes do deck, armazenando localmente as perguntas.


API (asyncStorage):

? Notificação ( onComponentDidMount do ListDeck )

getDecks()
getDeck()
addDeck()
addQuestion()