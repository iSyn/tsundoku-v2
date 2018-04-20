/*

QUESTIONS:
- Integer on SQL
- Testing basic route doesnt even work
- Why doesnt <Redirct/> work on HamburgerMenu.js

THINGS TO FIX:
- App breaks when searching for somethng that doesnt exist

THINGS TO ADD:
- in profile page, add another component for settings where it displays 
username and allows for password/username updates
*/


import React, { Component } from 'react';
import './Tsundoku.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import LandingPage from './components/LandingPage'
import SearchPage from './components/SearchPage'
import ProfilePage from './components/ProfilePage'


class Tsundoku extends Component {

    state = {
        user: null,
        userId: null,
        dateCreated: null,
        booksGivenUp: 0,

        savedBooks: [],
        showCompleted: false,

        searchResults: [],
        notifications: [],
        selected: null,
        searching: false,
        location: null,

        showHamburgerMenu: false,
        showSignupModal: false,
        showSigninModal: false,

        showChangeUsernameModal: false
    }

    componentDidMount = async () => {
        try {
            await axios.get("/users").then((res) => {
            })
        } catch (error) {
        }
        this.setState({ loading: false })
    }

    searchFor = async (search) => {

        this.setState({ searching: true })

        const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='
        let searchFor = search.replace(" ", "+")
        let URL = `${API_URL}${searchFor}&maxResults=40`;


        await axios.get(URL).then((res) => {
            let searchResults = res.data
            this.setState({ searchResults, location: 'books', showHamburgerMenu: false })
        })

        this.setState({ searching: false })
    }

    setSelected = (book) => {
        this.setState({ selected: book })
    }

    toggleChangeUsernameModal = () => {
        let showChangeUsernameModal = !this.state.showChangeUsernameModal
        this.setState({ showChangeUsernameModal })
    }

    changeUsername = async (new_username) => {
        let id = this.state.userId
        let notifications = this.state.notifications;
        await axios.get(`/users/username/${new_username}`).then((res) => {
            if (res.data === "") {
                axios.patch(`/users/${id}`, {
                    username: new_username
                }).then((res) => {
                    notifications.push({
                        type: 'success',
                        message: `You successfully changed your usename to: ${new_username}`
                    })
                    this.setState({
                        showChangeUsernameModal: false,
                        user: new_username,
                        notifications
                    })
                })
            } else {
                notifications.push({
                    type: 'error',
                    message: `The username ${new_username} already exists`
                })
                this.setState({ notifications })
            }
        })
    }

    toggleHamburgerMenu = () => {
        let showHamburgerMenu = !this.state.showHamburgerMenu
        this.setState({ showHamburgerMenu })
    }

    toggleSignupModal = () => {
        let showSignupModal = !this.state.showSignupModal
        this.setState({ showSignupModal, showHamburgerMenu: false, selected: null })
    }

    toggleSigninModal = () => {
        let showSigninModal = !this.state.showSigninModal
        this.setState({ showSigninModal, showHamburgerMenu: false, selected: null })
    }

    createNewUser = async (newUser) => {
        await axios.post("/users", newUser).then((res) => {
            let notifications = this.state.notifications;
            if (res.data) {
                notifications.push({
                    type: 'success',
                    message: `Account Created. Welcome ${newUser.username}`
                })

                this.setState({
                    showSignupModal: false,
                    user: newUser.username,
                    userId: res.data.user_id,
                    dateCreated: res.data.date_created,
                })
            } else {
                notifications.push({
                    type: 'error',
                    message: 'Username already exists'
                })
                this.setState({
                    notifications,
                })
            }
        })
    }

    signIn = async (username, password) => {
        await axios.get(`/users/username/${username}`).then((res) => {
            let notifications = this.state.notifications;
            if (res.data.password === password) {
                notifications.push({
                    type: 'success',
                    message: `Sign in successful. Welcome ${username}`
                })

                this.setState({
                    user: res.data.username,
                    userId: res.data.user_id,
                    dateCreated: res.data.date_created,
                    showSigninModal: false,
                    notifications
                })

                if (this.state.user === 'synclair') {
                    this.getSavedBooks();
                }
            } else {
                notifications.push({
                    type: 'error',
                    message: 'Incorrect username or password'
                })
                this.setState({ notifications })
            }
        })
    }

    signOut = () => {

        let notifications = this.state.notifications
        notifications.push({
            type: 'info',
            message: 'You have signed out successfully'
        })

        this.setState({
            showHamburgerMenu: false,
            user: null,
            userId: null,
            redirect: 'home',
            location: 'home'
        })
    }

    removeNotification = (index) => {
        let notifications = this.state.notifications
        notifications.splice(index, 1)
        this.setState({ notifications })
    }

    closeAllModals = () => {
        this.setState({
            selected: null,
            showSignupModal: false,
            showSigninModal: false,
            showChangeUsernameModal: false
        })
    }

    // toggleCompleted = (book_index) => {
    //     let savedBooks = this.state.savedBooks
    //     let date = new Date().toLocaleDateString();
    
    //     if (!savedBooks[book_index].completed) {
    //         savedBooks[book_index].completed = !savedBooks[book_index].completed;
    //         savedBooks[book_index].date_completed = date
    //     } else {
    //         savedBooks[book_index].completed = false
    //         savedBooks[book_index].date_completed = null
    //     }
    //     this.setState({ savedBooks, selected: null })
    // }

    toggleCompleted = (book_id) => {
        let savedBooks = this.state.savedBooks
        let date = new Date().toLocaleDateString()

        for (let i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].book_id === book_id) {
                savedBooks[i].completed = !savedBooks[i].completed
                if (savedBooks[i].date_completed === null) {
                    savedBooks[i].date_completed = date;
                } else {
                    savedBooks[i].date_completed = null;
                }
            }
        }
        this.setState({ savedBooks, selected: null })
    }

    toggleShowCompleted = () => {
        let showCompleted = !this.state.showCompleted
        this.setState({ showCompleted })
    }

    getSavedBooks = () => {

        let savedBooks = [...this.state.savedBooks]
        savedBooks.push(
            { 
                book_id: 1, 
                user_id: 1, 
                date_added: "3/29/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "Cracking the Coding Interview",
                    authors: ["Gayle Laakmann McDowell"],
                    description: "Now in the 6th edition, the book gives you the interview preparation you need to get the top software developer jobs. This is a deeply technical book and focuses on the software engineering skills to ace your interview. The book includes 189 programming interview questions and answers, as well as other advice.", 
                    imageLinks: {
                        thumbnail:"http://books.google.com/books/content?id=jD8iswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    }
                }
            }, { 
                book_id: "y3CyRurE7P4C", 
                user_id: 1, 
                date_added: "3/29/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "Fahrenheit 451",
                    authors: ["Ray Bradbury"],
                    description: "A totalitarian regime has ordered all books to be destroyed, but one of the book burners, Guy Montag, suddenly realizes their merit.",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=y3CyRurE7P4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "S85NCwAAQBAJ",
                user_id: 1, 
                date_added: "3/31/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "It",
                    authors: ["Stephen King"],
                    description: "They were seven teenagers when they first stumbled upon the horror. Now they were grown-up men and women who had gone out into the big world to gain success and happiness. But none of them could withstand the force that drew them back to Derry, Maine to face the nightmare without an end, and the evil without a name.",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=S85NCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "iEWAAwAAQBAJ",
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "Pet Sematary",
                    authors: ["Stephen King"],
                    description: "Don’t miss the classic tale from King of Horror and #1 New York Times bestselling author Stephen King, described by Publishers Weekly as “the most frightening novel Stephen King has ever written.” When the Creeds move into a beautiful old house in rural Maine, it all seems too good to be true: physician father, beautiful wife, charming little daughter, adorable infant son—and now an idyllic home. As a family, they’ve got it all…right down to the friendly cat. But the nearby woods hide a blood-chilling truth—more terrifying than death itself...and hideously more powerful. The Creeds are going to learn that sometimes dead is better.",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=iEWAAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "j24GMN0OtS8C",
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: true,
                date_completed: "4/2/2018",
                volumeInfo: {
                    title: "The Hitchhiker's Guide to the Galaxy",
                    authors: ["Douglas Adams"],
                    description: "“Extremely funny . . . inspired lunacy . . . [and] over much too soon.”—The Washington Post Book World Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker’s Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor. Together this dynamic pair begin a journey through space aided by quotes from The Hitchhiker’s Guide (“A towel is about the most massively useful thing an interstellar hitchhiker can have”) and a galaxy-full of fellow travelers: Zaphod Beeblebrox—the two-headed, three-armed ex-hippie and totally out-to-lunch president of the galaxy; Trillian, Zaphod’s girlfriend (formally Tricia McMillan), whom Arthur tried to pick up at a cocktail party once upon a time zone; Marvin, a paranoid, brilliant, and chronically depressed robot; Veet Voojagig, a former graduate student who is obsessed with the disappearance of all the ballpoint pens he bought over the years. Where are these pens? Why are we born? Why do we die? Why do we spend so much time between wearing digital watches? For all the answers stick your thumb to the stars. And don't forget to bring a towel! Praise for The Hitchhiker’s Guide to the Galaxy “A whimsical oddyssey . . . Characters frolic through the galaxy with infectious joy.”—Publishers Weekly “Irresistable!”—The Boston Globe",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=iEWAAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "uyr8BAAAQBAJ",
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: true,
                date_completed: "4/2/2018",
                volumeInfo: {
                    title: "1984",
                    authors: ["George Orwell"],
                    description: "George Orwell's dystopian masterpiece, Nineteen Eighty-Four is perhaps the most pervasively influential book of the twentieth century, making famous Big Brother, newspeak and Room 101. 'Who controls the past controls the future: who controls the present controls the past'",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=uyr8BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "nkalO3OsoeMC",
                user_id: 1, 
                date_added: "4/1/2018", 
                completed: true,
                date_completed: "4/2/2018",
                volumeInfo: {
                    title: "Animal Farm",
                    authors: ["George Orwell"],
                    description: "George Orwell’s famous satire of the Soviet Union, in which “all animals are equal but some animals are more equal than others.”",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=nkalO3OsoeMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "nEOlswEACAAJ",
                user_id: 1, 
                date_added: "4/2/2018", 
                completed: false,
                date_completed: null,
                volumeInfo: {
                    title: "Java Programming For Dummies",
                    authors: ["Donald J. Koosis", "David Koosis"],
                    description: `"Java Programming "Cheat Sheet" Inside! Everything You Need to Create Java 2 Applets! If you want to use Java 2 — and not just read about it — this is the book for you. Find out how to add oomph and interactivity to your Web site with some nifty applets, provide a friendly user interface to your corporate database, or develop games. Java™ Programming For Dummies®, 3rd Edition, brings you all the practical information and sample code you need to get programming in Java 2 — right away. Start Programming Today! CD-ROM Includes: Java 2: Create your own Java 2 applets with Java 2 development tools from Sun Microsystems MindSpring Internet Access Microsoft's popular Web browser Trial version of JBuilder Professional 2 Sample applets created by people from around the world — including Ticker Tape, Calendar, Sprite, Quizem, JavaBots, Shopping Cart, and more! Shareware programs are fully functional, free trial versions of copyrighted programs. If you like particular programs, register with their authors for a nominal fee and receive licenses, enhanced versions, and technical support. Freeware programs are free, copyrighted games, applications, and utilities. You can copy them to as many PCs as you like — free — but they have no technical support. System Requirements: 486 or faster PC with Windows 95, 98, or NT; or 68040 or PowerPC Mac with System 7.5 or later; SPARC Solaris 2.3 or 2.4, or X86 Solaris 2.5; 16 MB RAM; CD-ROM drive double-speed (2x) or faster. Inside, find helpful advice on how to: Master the latest Internet standards in Java 2 Write Java 2 code you can use again and again in different applications Produce dynamic Web pages that respond to user input Create sprites, bots, and other applets that can run on all kinds of computers — PCs, Macs, and UNIX workstations Transfer mini programs without losing or corrupting data Develop multi-user games you can play across the Internet"`,
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=nEOlswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    }
                }
            }, { 
                book_id: "fIgw1X5oa7gC",
                user_id: 1, 
                date_added: "4/2/2018", 
                completed: true,
                date_completed: "4/2/2018",
                volumeInfo: {
                    title: "Depression For Dummies",
                    authors: ["Laura L. Smith", "Charles H. Elliott"],
                    description: `""What do you have to be depressed about?" Bet you've heard that one before. Or how about, "You're depressed? Just get over it!" Easier said than done, right? Or here's a favorite, "They have a pill for that now, you know." Unfortunately, such naïve armchair psychology rarely works for someone suffering from the very real plight of depression. All it does is seek to trivialize depression and characterize depressed people as "whiners" who have nothing better to do than to "complain about their lives." But the truth is, depression is a very real problem. In fact, the World Health Organization estimates that, on any given day, 121 million people worldwide suffer from depression. And depression rates continue to increase – for example, kids exhibit depression at nearly ten times the rate of previous generations. Theories abound as to why depression rates are increasing, but regardless of the cause, this scourge continues to rob its victims of happiness, joy, and the capacity to give and receive love. So why Depression For Dummies, when there's already a glut of self-help books on the market peddling so-called cures and remedies for depression? Because this book satisfies the need for a straight-talking, no-nonsense resource on depression. The only agenda of Depression For Dummies is to present you with the facts on depression and explain the options for dealing with it. Rest assured, this is no infomercial in a yellow and black cover. Here's just a sampling of what you'll find in Depression For Dummies: Demystifying the types of depression Discovering what goes on in the body of a depressed person Detecting and diagnosing depression Seeking help through therapy and medication Modifying depressed behavior and solving life's headaches Dealing with depression resulting from grief and relationship issues Cutting through the hype of alternative treatments for depression Moving beyond depression: Avoiding relapses and pursuing a happy life Top Ten lists on getting rid of a your bad mood and helping your kids and other family members out of depression So, whatever your level of depression – whether you suffer from occasional bouts or you find yourself seriously debilitated by depression – Depression For Dummies can give you the insight and tools you need to once again find enjoyment and happiness in life. All it takes is one step."`,
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=fIgw1X5oa7gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "qhSawKZHRWYC",
                user_id: 1, 
                date_added: "4/3/2018", 
                completed: true,
                date_completed: "4/3/2018",
                volumeInfo: {
                    title: "The Twits",
                    authors: ["Roald Dahl"],
                    description: "From the bestselling author of Charlie and the Chocolate Factory and The BFG! Mr. and Mrs. Twit are the smelliest, nastiest, ugliest people in the world. They hate everything—except playing mean jokes on each other, catching innocent birds to put in their Bird Pies, and making their caged monkeys, the Muggle-Wumps, stand on their heads all day. But the Muggle-Wumps have had enough. They don't just want out, they want revenge.",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=qhSawKZHRWYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "o5-dBrmqAJ0C",
                user_id: 1, 
                date_added: "4/3/2018", 
                completed: true,
                date_completed: "4/4/2018",
                volumeInfo: {
                    title: "James and the Giant Peach",
                    authors: ["Roald Dahl"],
                    description: "From the bestselling author of Charlie and the Chocolate Factory and The BFG! After James Henry Trotter's parents are tragically eaten by a rhinoceros, he goes to live with his two horrible aunts, Spiker and Sponge. Life there is no fun, until James accidentally drops some magic crystals by the old peach tree and strange things start to happen. The peach at the top of the tree begins to grow, and before long it's as big as a house. Inside, James meets a bunch of oversized friends—Grasshopper, Centipede, Ladybug, and more. With a snip of the stem, the peach starts rolling away, and the great adventure begins! From the Trade Paperback edition.",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=o5-dBrmqAJ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            }, { 
                book_id: "IClpljgfEZEC",
                user_id: 1, 
                date_added: "4/4/2018", 
                completed: true,
                date_completed: null,
                volumeInfo: {
                    title: "Matilda",
                    authors: ["Roald Dahl"],
                    description: "Now a musical! Matilda is a sweet, exceptional young girl, but her parents think she's just a nuisance. She expects school to be different but there she has to face Miss Trunchbull, a menacing, kid-hating headmistress. When Matilda is attacked by the Trunchbull she suddenly discovers she has a remarkable power with which to fight back. It'll take a superhuman genius to give Miss Trunchbull what she deserves and Matilda may be just the one to do it! Here is Roald Dahl's original novel of a little girl with extraordinary powers. This much-loved story has recently been made into a wonderful new musical, adapted by Dennis Kelly with music and lyrics by Tim Minchin.",
                    imageLinks: {
                        thumbnail: "http://books.google.com/books/content?id=IClpljgfEZEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    }
                }
            },
        );


        this.setState({ savedBooks, bookId: savedBooks.length });
    }

    saveBook = async (book) => {
        let savedBooks = [...this.state.savedBooks]
        savedBooks.push(book)
        let notifications = [...this.state.notifications]
        notifications.push({
            type: 'success',
            message: `Saved the book ${book.volumeInfo.title}`
        })
        this.setState({ 
            savedBooks, 
            selected: null, 
            notifications
         })
        // await axios.post('/books', book)
    }

    changeLocation = (location) => {
        this.setState({ location, showHamburgerMenu: false, notifications: [] })
    }

    giveUp = (bookId) => {
        let savedBooks = this.state.savedBooks
        for (let i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].book_id === bookId) {
                let index = i;
                let booksGivenUp = this.state.booksGivenUp
                booksGivenUp++
                savedBooks.splice(index, 1)

                this.setState({ savedBooks, selected: null, booksGivenUp });
            }
        }
    }

    render() {
        
        const LandingPageComponent = () => {
            return (
                <LandingPage 
                    searchFor={this.searchFor.bind(this)}
                    searching={this.state.searching}
                    location={this.state.location}
                    //
                    showSignupModal={this.state.showSignupModal}
                    showSigninModal={this.state.showSigninModal}
                    showHamburgerMenu={this.state.showHamburgerMenu}

                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}
                    //
                    createNewUser={this.createNewUser}
                    signOut={this.signOut.bind(this)}
                    signIn={this.signIn.bind(this)}
                    user={this.state.user}
                    //

                    notifications={this.state.notifications}
                    removeNotification={this.removeNotification.bind(this)}
                    changeLocation={this.changeLocation.bind(this)}
                />
            )
        }

        const SearchPageComponent = () => {
            return (
                <SearchPage 
                    searchFor={this.searchFor.bind(this)}
                    searchResults={this.state.searchResults}
                    setSelected={this.setSelected.bind(this)}
                    selected={this.state.selected}
                    showHamburgerMenu={this.state.showHamburgerMenu}

                    showSignupModal={this.state.showSignupModal}
                    showSigninModal={this.state.showSigninModal}

                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}

                    createNewUser={this.createNewUser}
                    signOut={this.signOut.bind(this)}
                    signIn={this.signIn.bind(this)}
                    user={this.state.user}

                    location={this.state.location}
                    changeLocation={this.changeLocation.bind(this)}

                    notifications={this.state.notifications}
                    removeNotification={this.removeNotification.bind(this)}

                    saveBook={this.saveBook.bind(this)}
                />
            )
        }

        const ProfilePageComponent = () => {
            return (
                <ProfilePage 
                    user={this.state.user}
                    dateCreated={this.state.dateCreated}
                    //
                    showHamburgerMenu={this.state.showHamburgerMenu}
                    toggleHamburgerMenu={this.toggleHamburgerMenu.bind(this)}
                    toggleSignupModal={this.toggleSignupModal.bind(this)}
                    toggleSigninModal={this.toggleSigninModal.bind(this)}
                    closeAllModals={this.closeAllModals.bind(this)}

                    signOut={this.signOut.bind(this)}
                    signIn={this.signIn.bind(this)}

                    location={this.state.location}
                    changeLocation={this.changeLocation.bind(this)}

                    booksGivenUp={this.state.booksGivenUp}
                    giveUp={this.giveUp.bind(this)}
                    savedBooks={this.state.savedBooks}
                    toggleCompleted={this.toggleCompleted.bind(this)}
                    toggleShowCompleted={this.toggleShowCompleted.bind(this)}
                    showCompleted={this.state.showCompleted}

                    selected={this.state.selected}
                    setSelected={this.setSelected.bind(this)}

                    notifications={this.state.notifications}
                    removeNotification={this.removeNotification.bind(this)}

                    toggleChangeUsernameModal={this.toggleChangeUsernameModal.bind(this)}
                    showChangeUsernameModal={this.state.showChangeUsernameModal}
                    changeUsername={this.changeUsername.bind(this)}
                />
            )
        }

        return (  
            <Router>
                <Switch>
                    <Route exact path='/' render={LandingPageComponent} />
                    <Route exact path='/books' render={SearchPageComponent} />
                    <Route exact path='/profile' render={ProfilePageComponent} />
                </Switch>
            </Router>
        )
    }
}
 
export default Tsundoku;