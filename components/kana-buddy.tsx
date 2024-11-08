'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, Check, Info, Loader2 } from 'lucide-react'

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
    const [isProcessing, setIsProcessing] = useState(false)
    const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
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
        if (feedbackTimeoutRef.current) {
          clearTimeout(feedbackTimeoutRef.current)
        }
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
      setIsProcessing(false)
    }
  
    const toggleCharacter = (character: string) => {
      if (isStarted) return;
      setSelectedCharacters(prev => 
        prev.includes(character) ? prev.filter(c => c !== character) : [...prev, character]
      );
    }
  
    const toggleRow = (row: string[]) => {
      if (isStarted) return;
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
      setIsProcessing(true)
      setFeedback('')
  
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
  
      if (input === characterMap[currentCharacter as keyof typeof characterMap]) {
        setFeedback('Correct!')
        setRemainingCharacters(prev => prev.filter(char => char !== currentCharacter))
        setUserInput('')
        setIsProcessing(false)
      } else {
        feedbackTimeoutRef.current = setTimeout(() => {
          if (input.length > 0) {
            setFeedback('Try again')
          }
          setIsProcessing(false)
        }, 500)
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
      if (isStarted) return;
      const charactersToAdd = currentTab === 'hiragana' ? hiragana : katakana;
      setSelectedCharacters(prev => Array.from(new Set([...prev, ...charactersToAdd])));
    }
  
    const handleClearAll = () => {
      if (isStarted) return;
      const charactersToRemove = currentTab === 'hiragana' ? hiragana : katakana;
      setSelectedCharacters(prev => prev.filter(char => !charactersToRemove.includes(char)));
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
              <div key={index} className="flex flex-wrap gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  className="w-14 h-8 text-sm sm:w-20 sm:h-12 sm:text-base"
                  onClick={() => toggleRow(row)}
                  disabled={isStarted}
                >
                  {row[0]}行
                </Button>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  {row.map((char) => (
                    <Button
                      key={char}
                      variant={selectedCharacters.includes(char) ? "default" : "outline"}
                      className="w-12 h-12 text-lg relative group flex-shrink-0"
                      onClick={() => toggleCharacter(char)}
                      disabled={isStarted}
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
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  
    const SelectKanaSection = () => (
      <Card className="w-full lg:w-[450px]">
        <CardHeader>
          <CardTitle>Select Kana</CardTitle>
          <CardDescription>Choose the characters you want to practice</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs key={currentTab} defaultValue={currentTab} className="w-full" onValueChange={(value) => setCurrentTab(value as 'hiragana' | 'katakana')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hiragana">Hiragana</TabsTrigger>
              <TabsTrigger value="katakana">Katakana</TabsTrigger>
            </TabsList>
            <div className="my-4 space-y-4">
              <div className="flex space-x-2">
                <Button onClick={handleAddAll} size="sm" disabled={isStarted}>Add All</Button>
                <Button onClick={handleClearAll} size="sm" variant="outline" disabled={isStarted}>Clear All</Button>
              </div>
            </div>
            <TabsContent value="hiragana">
              <ScrollArea className="h-[300px] sm:h-[400px] lg:h-[600px] pr-4">
                <CharacterGrid rows={hiraganaRows} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="katakana">
              <ScrollArea className="h-[300px] sm:h-[400px] lg:h-[600px] pr-4">
                <CharacterGrid rows={katakanaRows} />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Selected: {selectedCharacters.length} characters
          </p>
        </CardFooter>
      </Card>
    )
  
    const getSelectedTypes = () => {
      const hasHiragana = selectedCharacters.some(char => hiragana.includes(char));
      const hasKatakana = selectedCharacters.some(char => katakana.includes(char));
      if (hasHiragana && hasKatakana) return "Hiragana & Katakana";
      if (hasHiragana) return "Hiragana";
      if (hasKatakana) return "Katakana";
      return "None";
    }
  
    const InfoCards = () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              How to Play
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Select Kana characters</li>
              <li>Start the challenge</li>
              <li>Type the romaji for each character</li>
              <li>Complete all characters</li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Your Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Correctly identify all selected Kana characters as quickly as possible. Challenge yourself to improve your time with each attempt!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li>Characters: {selectedCharacters.length}</li>
              <li>Type: {getSelectedTypes()}</li>
              <li>Estimated time: ~{Math.ceil(selectedCharacters.length * 3 / 60)} minutes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  
    return (
      <div className="w-full max-w-[1300px] mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="w-full lg:w-[800px]">
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
            <CardContent className="pt-2 sm:pt-8"> 
              {selectedCharacters.length === 0 && (
                <div className="text-center text-muted-foreground mt-4">
                  <p>No kana selected. Choose some characters to start practicing!</p>
                  <p className="mt-2">Use the "Select Kana" button above or the panel on the right to pick characters.</p>
                </div>
              )}
              {selectedCharacters.length > 0 && !isStarted && !isComplete && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Ready to start your Kana journey?</h3>
                    <p className="text-muted-foreground">You've selected {selectedCharacters.length} characters. Let's begin!</p>
                  </div>
                  <Button onClick={handleStart} className="w-full">Start Challenge</Button>
                </div>
              )}
              {isStarted && !isComplete && (
                <div className="text-center mt-4">
                  <div className="text-6xl mb-4">{currentCharacter}</div>
                  <div className="relative">
                    <Input 
                      type="text" 
                      value={userInput} 
                      onChange={handleInputChange}
                      placeholder="Type the romaji"
                      className="text-center pr-10"
                    />
                    {isProcessing && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2 h-6">{feedback}</div>
                  <div className="mt-4 text-2xl font-bold">{formatTime(timer)}</div>
                </div>
              )}
              {!isStarted && !isComplete && (
                <div className="lg:hidden mb-4 mt-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full lg:hidden" disabled={isStarted}>
                        Select Kana ({selectedCharacters.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Select Kana Characters</DialogTitle>
                      </DialogHeader>
                      <SelectKanaSection />
                      <DialogFooter>
                        <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              {!isStarted && <InfoCards />}
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
              {(isStarted || isComplete) && (
                <Button onClick={handleRestart} size="icon" variant="ghost" className="p-0" title="Restart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 2v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/></svg>
                  <span className="sr-only">Restart</span>
                </Button>
              )}
            </CardFooter>
          </Card>
          <div className="hidden lg:block lg:w-[450px]">
            <SelectKanaSection />
          </div>
        </div>
      </div>
    )
  }