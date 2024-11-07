'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

const characterMap = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
  'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
  'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
  'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
  'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
  'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
  'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
  'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
  'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
  'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
  'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
  'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
  'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
  'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo'
}

const hiragana = Object.keys(characterMap).slice(0, 104)
const katakana = Object.keys(characterMap).slice(104)

const hiraganaRows = {
  seion: [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', 'ゆ', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', 'を', 'ん']
  ],
  dakuten: [
    ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
    ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    ['だ', 'ぢ', 'づ', 'で', 'ど'],
    ['ば', 'び', 'ぶ', 'べ', 'ぼ']
  ],
  handakuten: [
    ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ']
  ],
  yoon: [
    ['きゃ', 'きゅ', 'きょ'],
    ['しゃ', 'しゅ', 'しょ'],
    ['ちゃ', 'ちゅ', 'ちょ'],
    ['にゃ', 'にゅ', 'にょ'],
    ['ひゃ', 'ひゅ', 'ひょ'],
    ['みゃ', 'みゅ', 'みょ'],
    ['りゃ', 'りゅ', 'りょ'],
    ['ぎゃ', 'ぎゅ', 'ぎょ'],
    ['じゃ', 'じゅ', 'じょ'],
    ['びゃ', 'びゅ', 'びょ'],
    ['ぴゃ', 'ぴゅ', 'ぴょ']
  ]
}

const katakanaRows = {
  seion: [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', 'ユ', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', 'ヲ', 'ン']
  ],
  dakuten: [
    ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
    ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
    ['バ', 'ビ', 'ブ', 'ベ', 'ボ']
  ],
  handakuten: [
    ['パ', 'ピ', 'プ', 'ペ', 'ポ']
  ],
  yoon: [
    ['キャ', 'キュ', 'キョ'],
    ['シャ', 'シュ', 'ショ'],
    ['チャ', 'チュ', 'チョ'],
    ['ニャ', 'ニュ', 'ニョ'],
    ['ヒャ', 'ヒュ', 'ヒョ'],
    ['ミャ', 'ミュ', 'ミョ'],
    ['リャ', 'リュ', 'リョ'],
    ['ギャ', 'ギュ', 'ギョ'],
    ['ジャ', 'ジュ', 'ジョ'],
    ['ビャ', 'ビュ', 'ビョ'],
    ['ピャ', 'ピュ', 'ピョ']
  ]
}

const funFacts = [
    "Did you know? Japanese has three writing systems: hiragana, katakana, and kanji!",
    "Fun fact: The Japanese word for 'thank you' (ありがとう) literally means 'this is rare'!",
    "Interesting: Japanese has many onomatopoeias, including ones for silence (しーん, shiin)!",
    "Cool fact: In Japan, the sound a cat makes is 'nyan' (にゃん) instead of 'meow'!",
    "Did you know? Japanese doesn't have a future tense - context determines if something is happening in the future!",
    "Fact: The Japanese language has over 20 ways to say 'I'!",
    "Interesting: There's no plural form in Japanese - context determines if it's singular or plural.",
    "Did you know? The word 'emoji' comes from Japanese: 絵 (e) meaning 'picture' and 文字 (moji) meaning 'character'.",
    "Fun fact: In Japanese, there are different counting systems for different types of objects!",
    "Cool tidbit: The Japanese writing system is considered one of the most complicated in the world.",
    "Did you know? Japanese has many loan words from English, called 'wasei-eigo'.",
    "Interesting: The Japanese language has a specific word for the sound of rain on leaves: 木枯らし (kogarashi).",
    "Fun fact: In Japan, people often use their surname before their given name.",
    "Cool fact: Japanese has many words that don't have direct translations in English, like 'wabi-sabi' and 'ikigai'.",
    "Did you know? The Japanese word for 'you' (あなた) is rarely used in conversation as it can be considered rude.",
    "Interesting: Japanese has a grammatical concept called 'keigo' for showing respect in different social situations.",
    "Fun fact: The Japanese language has over 50,000 kanji characters, but only about 2,000 are commonly used.",
    "Cool tidbit: In Japanese, there's a word for the act of buying books and never reading them: 積ん読 (tsundoku).",
    "Did you know? Japanese doesn't use articles like 'a', 'an', or 'the'.",
    "Interesting: The Japanese word for 'cheers' when drinking is 乾杯 (kanpai), which means 'dry glass'.",
    "Fun fact: In Japanese, there are different words for 'wear' depending on what body part the clothing goes on.",
    "Cool fact: The Japanese language has many words related to the seasons and nature.",
    "Did you know? Japanese has a word for the sound of walking on snow: ぱっきり (pakkiri).",
    "Interesting: In Japanese, there's a specific grammatical form for expressing regret over not doing something.",
    "Fun fact: The Japanese writing system includes characters called 'kaomoji' that create elaborate emoticons.",
    "Cool tidbit: Japanese has many four-character idioms called 'yojijukugo' that express complex ideas concisely.",
    "Did you know? The Japanese language has a specific word for the act of gazing at the moon: 月見 (tsukimi).",
    "Interesting: In Japanese, there are different levels of politeness in speech, called 'keigo'.",
    "Fun fact: The Japanese word for 'cute' (かわいい, kawaii) has become internationally recognized.",
    "Cool fact: Japanese has many onomatopoeias for emotions, like ドキドキ (dokidoki) for a racing heart.",
    "Did you know? The Japanese language has a word for the sound of leaves rustling: ざわざわ (zawazawa).",
    "Interesting: In Japanese, there's a specific word for the act of sun bathing: 日向ぼっこ (hinatabokko).",
    "Fun fact: Japanese has many words that are palindromes, like とんかつ (tonkatsu) for pork cutlet.",
    "Cool tidbit: The Japanese language has a specific word for the act of eating until you're 80% full: 腹八分目 (hara hachi bu).",
    "Did you know? Japanese has a word for the sound of a stomach growling: ぐうぐう (guuguu).",
    "Interesting: In Japanese, there's a specific word for the act of forest bathing: 森林浴 (shinrin-yoku).",
    "Fun fact: The Japanese word for 'work' (仕事, shigoto) literally means 'serve thing'.",
    "Cool fact: Japanese has many words that are loan words from Portuguese, like パン (pan) for bread.",
    "Did you know? The Japanese language has a word for the sound of rain: しとしと (shitoshito) for gentle rain.",
    "Interesting: In Japanese, there's a specific word for the act of looking at autumn leaves: 紅葉狩り (momijigari).",
    "Fun fact: Japanese has a word for the act of wearing clothes inside out: 裏返し (uragaeshi).",
    "Cool tidbit: The Japanese language has a specific word for the sound of cicadas: ミーンミーン (miin miin).",
    "Did you know? Japanese has a word for the act of staying up all night: 徹夜 (tetsuya).",
    "Interesting: In Japanese, there's a specific word for the sound of wind chimes: チリンチリン (chirin chirin).",
    "Fun fact: The Japanese word for 'to be' changes depending on whether the subject is animate or inanimate.",
    "Cool fact: Japanese has many words that are homonyms, like はし (hashi) which can mean chopsticks, bridge, or edge.",
    "Did you know? The Japanese language has a word for the sound of footsteps: とことこ (tokotoko) for light steps.",
    "Interesting: In Japanese, there's a specific word for the act of air drying laundry: 干す (hosu).",
    "Fun fact: Japanese has a word for the act of pretending to be busy: 忙しいふり (isogashii furi).",
    "Cool tidbit: The Japanese language has a specific word for the sound of a heartbeat: ドクンドクン (dokun dokun).",
    "Did you know? Japanese has a word for the act of slurping noodles: すする (susuru).",
    "Interesting: In Japanese, there's a specific word for the act of taking a power nap: 仮眠 (kamin).",
    "Fun fact: The Japanese word for 'to ask' (聞く, kiku) is the same as the word for 'to listen'.",
    "Cool fact: Japanese has many words that are visual puns, like the kanji for 'rest' (休) which looks like a person leaning against a tree.",
    "Did you know? The Japanese language has a word for the sound of heavy rain: ざーざー (zaa zaa)."
  ]

export default function Component() {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [currentCharacter, setCurrentCharacter] = useState('')
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [remainingCharacters, setRemainingCharacters] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [currentTab, setCurrentTab] = useState<'hiragana' | 'katakana'>('hiragana')
  const [showCelebration, setShowCelebration] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [funFact, setFunFact] = useState('')
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStarted && !isComplete) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isStarted || isComplete) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, isComplete]);

  useEffect(() => {
    if (remainingCharacters.length > 0 && isStarted) {
      setCurrentCharacter(remainingCharacters[Math.floor(Math.random() * remainingCharacters.length)])
    } else if (remainingCharacters.length === 0 && selectedCharacters.length > 0 && isStarted) {
      setIsComplete(true)
      setShowCelebration(true)
      setIsStarted(false)
      setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)])
    }
  }, [remainingCharacters, selectedCharacters, isStarted])

  const resetCharacters = () => {
    setRemainingCharacters([...selectedCharacters])
    setIsComplete(false)
    setShowCelebration(false)
    setFeedback('')
    setUserInput('')
    setIsStarted(false)
    setCurrentCharacter('')
    setTimer(0)
  }

  const toggleCharacter = (character: string) => {
    setSelectedCharacters(prev => 
      prev.includes(character) ? prev.filter(c => c !== character) : [...prev, character]
    )
  }

  const toggleRow = (row: string[]) => {
    setSelectedCharacters(prev => {
      const newSelection = new Set(prev)
      let allInRow = true
      row.forEach(char => {
        if (newSelection.has(char)) {
          newSelection.delete(char)
        } else {
          allInRow = false
        }
      })
      if (!allInRow) {
        row.forEach(char => newSelection.add(char))
      }
      return Array.from(newSelection)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase()
    setUserInput(input)
    if (input === characterMap[currentCharacter as keyof typeof characterMap]) {
      setFeedback('Correct!')
      setRemainingCharacters(prev => prev.filter(char => char !== currentCharacter))
      setUserInput('')
    } else {
      setFeedback('Try again')
    }
  }

  const handleStart = () => {
    setRemainingCharacters([...selectedCharacters])
    setIsStarted(true)
    setTimer(0)
  }

  const handleRestart = () => {
    resetCharacters()
  }

  const handleAddAll = () => {
    const charactersToAdd = currentTab === 'hiragana' ? hiragana : katakana
    setSelectedCharacters(prev => Array.from(new Set([...prev, ...charactersToAdd])))
  }

  const handleClearAll = () => {
    const charactersToRemove = currentTab === 'hiragana' ? hiragana : katakana
    setSelectedCharacters(prev => prev.filter(char => !charactersToRemove.includes(char)))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const CharacterGrid = ({ rows }: { rows: { [key: string]: string[][] } }) => (
    <div className="space-y-6">
      {Object.entries(rows).map(([section, sectionRows]) => (
        <div key={section} className="space-y-2">
          <h3 className="text-lg font-semibold capitalize">{section}</h3>
          {sectionRows.map((row, index) => (
            <div key={index} className="flex space-x-2">
              <Button
                variant="outline"
                className="w-20"
                onClick={() => toggleRow(row)}
              >
                {row[0]}行
              </Button>
              {row.map((char) => (
                <Button
                  key={char}
                  variant={selectedCharacters.includes(char) ? "default" : "outline"}
                  className="w-12 h-12 text-lg relative group"
                  onClick={() => toggleCharacter(char)}
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                    {char}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {characterMap[char as keyof typeof characterMap]}
                  </span>
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>
        <div className="relative z-10">
          <CardTitle className="text-4xl font-bold text-center mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              KanaBuddy
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            Your friendly guide to learning Hiragana & Katakana!
          </CardDescription>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rotate-45 transform origin-bottom-left"></div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4" disabled={isStarted}>Select Kana ({selectedCharacters.length} selected)</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Select Kana Characters</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="hiragana" className="w-full" onValueChange={(value) => setCurrentTab(value as 'hiragana' | 'katakana')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hiragana">Hiragana</TabsTrigger>
                <TabsTrigger value="katakana">Katakana</TabsTrigger>
              </TabsList>
              <div className="my-4 space-y-4">
                <div className="flex space-x-2">
                  <Button onClick={handleAddAll} size="sm">Add All</Button>
                  <Button onClick={handleClearAll} size="sm" variant="outline">Clear All</Button>
                </div>
              </div>
              <TabsContent value="hiragana">
                <ScrollArea className="h-[400px] pr-4">
                  <CharacterGrid rows={hiraganaRows} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="katakana">
                <ScrollArea className="h-[400px] pr-4">
                  <CharacterGrid rows={katakanaRows} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {selectedCharacters.length > 0 && !isStarted && !isComplete && (
          <Button onClick={handleStart} className="w-full mt-4">Start</Button>
        )}
        {isStarted && !isComplete && (
          <div className="text-center mt-4">
            <div className="text-6xl mb-4">{currentCharacter}</div>
            <Input 
              type="text" 
              value={userInput} 
              onChange={handleInputChange}
              placeholder="Type the romaji"
              className="text-center"
            />
            <div className="mt-2">{feedback}</div>
            <div className="mt-4 text-2xl font-bold">{formatTime(timer)}</div>
          </div>
        )}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 text-primary">
                  お疲れ様でした！
                </h2>
                <p className="text-xl mb-4 text-muted-foreground">Otsukaresama deshita (Great job!)</p>
                <p className="text-lg mb-4">Time: {formatTime(timer)}</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mb-6 p-4 bg-primary/10 rounded-lg"
                >
                  <p className="text-sm font-medium text-primary">{funFact}</p>
                </motion.div>
                <Button onClick={handleRestart} className="w-full">
                  Start Again
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleRestart} disabled={selectedCharacters.length === 0 || (!isStarted && !isComplete)}>
          {isComplete ? 'Start Again' : 'Restart'}
        </Button>
      </CardFooter>
    </Card>
  )
}