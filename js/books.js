/* ==========================================================
   BOOK CATALOG  —  the single source of truth for every page
   ----------------------------------------------------------
   To add a book, copy one entry, give it a new unique id and
   drop the cover image into /images. Every page (home,
   categories, book detail, cart, checkout) picks it up.
   ========================================================== */

const CATEGORIES = {
  fiction: "Fiction",
  education: "Education",
  science: "Science",
  biography: "Biography",
  romance: "Romance",
};

const BOOKS = [
  //fiction
  {
    id: 1,
    title: "A Million to One",
    author: "Tony Faggioli",
    price: 18.0,
    category: "fiction",
    image: "images/a million to one.png",
    description:
      "Book two of the Fasano Trilogy by Tony Faggioli. As the cover warns, some demons are the kind you never see coming.",
  },

  {
    id: 3,
    title: "Beyond The Ocean Door",
    author: "Amisha Sathi",
    price: 21.5,
    category: "fiction",
    image: "images/ocean door.png",
    featured: true,
    description:
      "A fantasy adventure by Amisha Sathi: two telepaths, one daring escape plan, and a glowing door that leads somewhere far beyond the ordinary.",
  },

  {
    id: 5,
    title: "The Secret of Honeycake",
    author: "Kimberly Newton Fusco",
    price: 18.0,
    category: "fiction",
    image: "images/the secret.png",
    description:
      "A warm, illustrated-cover story by Kimberly Newton Fusco, full of cakes, cats and a secret waiting to be found.",
  },

   {
    id: 8,
    title: "ព្រះនាងមុខទី១០០០ និងគ្រោះទាំង៧",
    author: "ម៉ានិត",
    price: 9.5,
    priceNote: "≈ 38,000 ៛",
    category: "fiction",
    image: "images/image 5.png",
    lang: "km",
    spotlight: true,
    description:
      "សៀវភៅប្រលោមលោក «ព្រះនាងមុខទី១០០០ និងគ្រោះទាំង៧» គឺជាស្នាដៃនិទានដោយលោកម៉ានិត (និងសហនិពន្ធដោយកញ្ញា បូណារ័ស្យា ក្រោមការគ្រប់គ្រងការផលិតដោយលោកមុំ ម៉ានិត)។ សៀវភៅនេះមានក្រាស់ ៤៨៣ទំព័រ លក់ក្នុងតម្លៃប្រហែល ៣៨.០០០ រៀល ដោយមាញ្ញកម្រង់សាច់រឿងពីព្រេងនិទាន និងទេវកថាខ្មែរ។",
  },

  {
  id: 13,                                   // must be unique, so use the next number
  title: "The Catcher in the Rye",
  author: "J.D. Salinger",
  price: 13.99,
  category: "fiction",
  image: "images/the_catcher_in_the_rye.jpg",
  bestseller: false,
  featured: false,
  description: "The Catcher in the Rye follows sixteen-year-old Holden Caulfield after he bolts from prep school just before Christmas, drifting through New York City’s streets, bars, and parks. Haunted by his brother’s death and longing to shield kids like his sister Phoebe, he searches for something genuine in a world he calls phony.",
},

{
  id: 14,                                   // must be unique, so use the next number
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  price: 12.99,
  category: "fiction",
  image: "images/to_kill_a_mockingbird.jpg",
  bestseller: false,
  featured: false,
  description: "high school students to deeply engage with Harper Lee's To Kill a Mockingbird with this 138-page complete novel unit covering themes, symbolism, historical context, and close reading skills. Includes ready-to-use assessments, discussion questions with answer keys, vocabulary activities, a cross...",
},

{
  id: 15,                                   // must be unique, so use the next number
  title: "1984",
  author: "George Orwell",
  price: 12.99,
  category: "fiction",
  image: "images/1984.jpg",
  bestseller: true,
  featured: true,
  description: "1984 is a dystopian novel by George Orwell that explores themes of totalitarianism, surveillance, and individual freedom. Set in a future society where the government controls every aspect of life, the story follows Winston Smith as he navigates a world of oppression and seeks truth and rebellion.",
},

{
  id: 16,                                   // must be unique, so use the next number
  title: "The Hobbit",
  author: "J.R.R. Tolkein",
  price: 14.99,
  category: "fiction",
  image: "images/the_hobbit.jpg",
  bestseller: false,
  featured: false,
  description: "The Hobbit is a fantasy novel by J.R.R. Tolkien that follows the journey of Bilbo Baggins, a hobbit who embarks on an adventure with a group of dwarves to reclaim their homeland from the dragon Smaug. Along the way, Bilbo encounters trolls, goblins, elves, and the mysterious creature Gollum, discovering courage and resourcefulness he never knew he had.",
},

{
  id: 17,                                   // must be unique, so use the next number
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkein",
  price: 15.99,
  category: "fiction",
  image: "images/the_lord_of_the_rings.jpg",
  bestseller: false,
  featured: false,
  description: "The Lord of the Rings is a high fantasy novel by J.R.R. Tolkein that follows the journey of Frodo Baggins and the Fellowship of the Ring as they attempt to destroy the One Ring and save Middle-earth from the dark lord Sauron.",
},

{
  id: 22,
  title: "The Wind Rises",
  author: "Kaze tachinu",
  price: 15.99,
  category: "fiction",
  image: "images/the_wind_rises.jpg",
  bestseller: true,
  featured: true,
  description: "The Wind Rises is a historical fiction novel by Kaze tachinu that follows the story of Jiro Horikoshi, a Japanese engineer who designs aircraft during the early 20th century."
},

  //education
  {
    id: 2,
    title: "Educated: A Memoir",
    author: "Tara Westover",
    price: 12.5,
    category: "education",
    image: "images/educated.png",
    bestseller: true,
    featured: true,
    description:
      "Tara Westover's #1 New York Times bestselling memoir about growing up in rural Idaho, never setting foot in a classroom until she was seventeen, and the long road from there to a PhD at Cambridge.",
  },

  {
    id: 7,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 12.0,
    category: "education",
    image: "images/image 4.png",
    bestseller: true,
    featured: true,
    description:
      "Stephen R. Covey's classic on personal change: seven principle-centered habits for becoming more effective at work and in life. Over 15 million copies sold.",
  },

   {
  id: 9,                                  
  title: "Atomic Habits",
  author: "James Clear",
  price: 16.5,
  category: "education",                  
  image: "images/atomic_habits.jpg",       
  bestseller: true,                      
  featured: true,                        
  description: "Atomic Habits is a self-help book by James Clear that explores the power of small habits and how they can lead to significant personal and professional growth. The book provides practical strategies for building good habits, breaking bad ones, and creating an environment that supports positive change.",
},

{
  id: 18,                                   // must be unique, so use the next number
  title: "The Longest Talks",
  author: "Avery Baines",
  price: 16.5,
  category: "education",                   // fiction | education | science | biography | romance
  image: "images/the_logest_talk.jpg",       // must match the file name exactly
  bestseller: false,                       // true = also appears under "Best Selling"
  featured: false,                         // true = shows in "Featured Books" on the home page (first 3 only)
  description: "The Longest Talk: is about how silence, space, and simple presence sustain a life together. A quiet design for a powerful message.",
},

{
  id: 19,  
  title: "The Mindfulness Journey",
  author: "Corinne Sweet",
  price: 16.5,
  category: "education",                   // fiction | education | science | biography | romance
  image: "images/the_mindfullness_journey.jpg",       // must match the file name exactly
  bestseller: false,                       // true = also appears under "Best Selling"
  featured: false,                         // true = shows in "Featured Books" on the home page (first 3 only)
  description: "The Mindfulness Journey: is about how silence, space, and simple presence sustain a life together. A quiet design for a powerful message.",                                 // must be unique, so use the next number
  
},

{
  id: 41,  
  title: "The Science of Learning",
  author: "Pamela D. Davis",
  price: 24.99,
  category: "education",
  image: "images/the_science.jpg",
  bestseller: false,
  featured: false,
  description: "The Science of Learning explores the cognitive processes and neural mechanisms underlying how we acquire, retain, and apply knowledge."
},

{
  id: 43,
  title: "Never Forget what You Read",
  author: "James Clear",
  price: 16.99,
  category: "education",
  image: "images/never.jpg",
  bestseller: true,
  featured: true,
  description: "Struggling to remember what you read? Never Forget What You Read reveals 7 simple and powerful steps to boost memory, improve focus, and retain information for life. This practical guide helps students, self-learners, and book lovers master effective reading techniques, memory improvement strategies, and long-term retention methods. Learn how to train your brain, apply proven study techniques, and turn reading into lasting knowledge"
},

{
  id: 42,
  title: "The Machine and the Mind",
  author: "JD Arden",
  price: 22.99,
  category: "education",
  image: "images/machine.jpg",
  bestseller: false,
  featured: false,
  description: "The Machine and the Mind is a philosophical exploration of the nature of consciousness and the mind-body problem, examining the relationship between artificial intelligence and human cognition."
},

{
  id: 20,
  title: "The Ocean Waves",
  author: "Kaori Nakamura",
  price: 15.99,
  category: "fiction",
  image: "images/ocean_wave.jpg",
  bestseller: true,
  featured: true,
  description: "The Ocean Waves is a historical fiction novel by Kaori Nakamura that follows the story of Claire Randall, a British nurse who travels back in time to 18th-century Scotland."
},

{
  id: 21,
  title: "The Science of Happiness",
  author: "Diana Gabaldon",
  price: 15.99,
  category: "science",
  image: "images/the_science_of_happiness.jpg",
  bestseller: false,
  featured: false,
  description: "The Science of Happiness is a self-help book by Diana Gabaldon that explores the psychological and scientific aspects of well-being and contentment."
},

  // romance
  {
    id: 4,
    title: "Voices of the Winds",
    author: "Quinn Harper",
    price: 18.0,
    category: "romance",
    image: "images/voice of the wind.png",
    description: "A heartfelt romance novel by Quinn Harper.",
  },

  {
  id: 10,                                   // must be unique, so use the next number
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 12.99,
  category: "romance",                    // fiction | education | science | biography | romance
  image: "images/the_great_gatsby.jpg",    // must match the file name exactly
  bestseller: false,                       // true = also appears under "Best Selling"
  featured: false,                         // true = shows in "Featured Books" on the home page (first 3 only)
  description: "The Great Gatsby is a classic novel by F. Scott Fitzgerald that explores themes of wealth, love, and the American Dream in 1920s America.",
},

{
  id: 12,                                   // must be unique, so use the next number
  title: "Pride and Prejudice",
  author: "Jane Austen",
  price: 12.99,
  category: "romance",
  image: "images/pride_and_prejudice.jpg",
  bestseller: false,
  featured: false,
  description: "Experience the timeless romance and brilliant wit of Jane Austen’s Pride and Prejudice. Follow Elizabeth Bennet and Mr. Darcy as they navigate love, class, and misunderstandings in Regency-era England. Perfect for classic literature lovers, book clubs, and romantic fiction readers! 🌹📖 (As an Amazon Associate, I earn from qualifying purchases.",
},


{
  id: 23,
  title: "Until We Meet Again",
  author: "Diana Gabaldon",
  price: 15.99,
  category: "romance",
  image: "images/until_we_meet.jpg",
  bestseller: true,
  featured: true,
  description: "Until We Meet Again is a romantic novel by Diana Gabaldon that follows the story of two people who are separated by circumstances but hope to reunite."
},

{
  id: 24,
  title: "Beautiful Lies",
  author: "Eme Ryrron",
  price: 15.99,
  category: "romance",
  image: "images/beautiful_lies.jpg",
  bestseller: true,
  featured: true,
  description: "Beautiful Lies is a romantic novel by Diana Gabaldon that follows the story of two people who are separated by circumstances but hope to reunite."
},

{
  id: 25,
  title: "On Rainy Days",
  author: "Diana Gabaldon",
  price: 15.99,
  category: "romance",
  image: "images/on_rainy_day.jpg",
  bestseller: false,
  featured: false,
  description: "On Rainy Days is a romantic novel by Diana Gabaldon that follows the story of two people who are separated by circumstances but hope to reunite."
},
  
{
  id: 27,
  title: "Chasing Her",
  author: "Diana Gabaldon",
  price: 15.99,
  category: "romance",
  image: "images/Chasing_her.jpg",
  bestseller: false,
  featured: false,
  description: "Chasing Her is a romantic novel by Diana Gabaldon that follows the story of two people who are separated by circumstances but hope to reunite."
},
{
  id: 29,
  title: "You've Reached Sam",
  author: "Dustin Thao",
  price: 15.99,
  category: "romance",
  image: "images/you've_reach_sam.jpg",
  bestseller: false,
  featured: false,
  description: "a heartfelt novel about love and loss and what it means to say goodbye.Seventeen-year-old Julie Clarke has her future all planned out—move out of her small town with her boyfriend Sam, attend college in the city; spend a summer in Japan. But then Sam dies. And everything changes. Heartbroken, Julie skips his funeral, throws out his belongings, and tries everything to forget him. But a message Sam left behind in her yearbook forces memories to return. Desperate to hear him one more time, Julie calls Sam's cell phone just to listen to his voice mail recording. And Sam picks up the phone.The connection is temporary. But hearing Sam's voice makes Julie fall for him all over again and with each call, it becomes harder to let him go.What would you do if you had a second chance at goodbye?"
},

  //science
  {
    id: 6,
    title: "The Science of Science",
    author: "Dashun Wang & Albert-László Barabási",
    price: 21.5,
    category: "science",
    image: "images/science.png",
    description:
      "Dashun Wang and Albert-László Barabási use data to explore how scientists work, collaborate and make breakthroughs — the science of how science itself succeeds.",
  },

{
  id: 11,                                   // must be unique, so use the next number
  title: "Sapiens: A Brief History of Humankind",
  author: "Yuval Noah Harari",
  price: 15.99,
  category: "science",
  image: "images/sapiens.jpg",
  bestseller: true,
  featured: true,
  description: "Sapiens: A Brief History of Humankind explores the history of our species, from the emergence of Homo sapiens in Africa to the present day. Harari examines how biology, culture, and technology have shaped human societies and our understanding of the world.",
},

{
  id: 26,
  title: "The Ocean's True Colors",
  author: "Diana Gabaldon",
  price: 15.99,
  category: "science",
  image: "images/the_ocean_true_color.jpg",
  bestseller: true,
  featured: true,
  description: "The Ocean's True Colors is a historical fiction novel by Diana Gabaldon that follows the story of Claire Randall, a British nurse who travels back in time to 18th-century Scotland."
},

{
  id: 28,
  title: "The Science of Love",
  author: "Diana Gabaldon",
  price: 15.99,
  category: "science",
  image: "images/the_science_of_love.jpg",
  bestseller: false,
  featured: false,
  description: "The Science of Love is a scientific exploration of the chemistry and biology behind human attraction and relationships."
},

{
  id: 38,
  title: "When Breath Becomes Air",
  author: "Paul Kalanithi",
  price: 15.99,
  category: "science",
  image: "images/when_breath.jpg",
  bestseller: false,
  featured: false,
  description: "When Breath Becomes Air is a memoir by Paul Kalanithi about his experience with terminal lung cancer and his journey from being a neurosurgeon to being a patient."
},

{
  id: 39,
  title: "From Neurons to brain: The Science of the Mind",
  author: "Michael S. Gazzaniga",
  price: 24.99,
  category: "science",
  image: "images/from.jpg",
  bestseller: false,
  featured: false,
  description: "From Neurons to brain: The Science of the Mind explores the fascinating world of neuroscience and how the brain creates our thoughts, emotions, and behaviors."
},

{
  id: 40,
  title: "Genetic Habits",
  author: "Dr. Rahul Deb",
  price: 16.99,
  category: "science",
  image: "images/genetic.jpg",
  bestseller: false,
  featured: false,
  description: "Genetic Habits is a science-based exploration of how daily routines shape our health, mindset, and future. Written by physician and academic Dr. Rahul Deb, the book blends neuroscience, epigenetics, and behavioral psychology to explain how habits function like life’s DNA programming success or failure. Through practical strategies and relatable insights, the author shows readers how to rewire behavior, break negative cycles, and build habits that foster long-term resilience, productivity, and well-being. With a clear focus on bridging science and self-improvement, this book empowers readers."
},

// biography
{
  id: 30,
  title: "We Were Dreamers",
  author: "Olivia Munn",
  price: 15.99,
  category: "biography",
  image: "images/we_were_dreamers.jpg",
  bestseller: true,
  featured: true,
  description: "We Were Dreamers is a romantic novel by Olivia Munn that follows the story of two people who are separated by circumstances but hope to reunite."
},

{
  id: 31,
  title: "Buffett",
  author: "Roger Lowenstein",
  price: 12.99,
  category: "biography",
  image: "images/buffet.jpg",
  bestseller: false,
  featured: false,
  description: "Buffett is a biography of Warren Buffett by Roger Lowenstein."
},

{
  id: 32,
  title: "The Ride of a Lifetime",
  author: "Robert Iger",
  price: 13.99,
  category: "biography",
  image: "images/the_ride_of_a_lifetime.jpg",
  bestseller: false,
  featured: false,
  description: "Robert Iger's book about lessons he learned as the CEO of The Walt Disney Company — a great way to keep them feeling inspired in between episodes of The Imagineering Story. 40 Little Gifts To Give Anyone Who Loves Disney"
},

{
  id: 33,
  title: "A Burning in My Bones",
  author: "Eugene Peterson",
  price: 16.99,
  category: "biography",
  image: "images/a_burning_in_my_bones.jpg",
  bestseller: false,
  featured: false,
  description: "This murky water may clear later this month, when a long-awaited authorized biography of Peterson is released. Drawing on never-before-published letters, journals and exclusive interviews, Winn Collier’s “ A Burning in My Bones ” reveals while Peterson long wrestled with the Bible’s teachings on homosexuality, he at last embraced LGBTQ inclusion on the grounds of Christian love."
},

{
  id: 34,
  title: "Unfinished",
  author: "Priyanka Chopra",
  price: 12.99,
  category: "biography",
  image: "images/unfinished.jpg",
  bestseller: false,
  featured: false,
  description: "Unfinished is a biography of Priyanka Chopra that follows the story of her life and career."
},

{
  id: 35,
  title: "The Smart Money Woman",
  author: "Arese Ugwu",
  price: 17.99,
  category: "biography",
  image: "images/women.jpg",
  bestseller: false,
  featured: false,
  description: "The Smart Money Woman is a financial guide by Arese Ugwu that helps women build wealth and achieve financial independence."
},

{
  id: 36,
  title: "The Art of Social Intelligence",
  author: "Daniel Goleman",
  price: 15.99,
  category: "biography",
  image: "images/the_art_of_social.jpg",
  bestseller: false,
  featured: false,
  description: "Art of Social Intelligence by Academy EPC explores practical techniques for reading people, understanding social cues, building rapport, improving communication, and navigating conversations with greater confidence. Discover actionable social intelligence strategies designed to help you communicate more effectively, understand people better, and create stronger personal and professional connections. social intelligence how to read people social skills communication skills build rapport conversation skills emotional intelligence confidence in communication interpersonal skills psychology of people"
},

{
  id: 37,
  title: "Becoming",
  author: "Michelle Obama",
  price: 14.99,
  category: "biography",
  image: "images/becoming.jpg",
  bestseller: true,
  featured: true,
  description: "Becoming is a memoir by Michelle Obama that chronicles her life from her childhood in Chicago to her years as First Lady of the United States."
}
];

/* ---------- helpers shared by every page ---------- */

function getBook(id) {
  return BOOKS.find((b) => b.id === Number(id));
}

function money(n) {
  return "$" + Number(n).toFixed(2);
}

function esc(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

function imgSrc(book) {
  return encodeURI(book.image);
}

function categoryLabel(key) {
  if (key === "bestselling") return "Best Selling";
  return CATEGORIES[key] || key;
}

function booksIn(key) {
  if (!key || key === "all") return BOOKS.slice();
  if (key === "bestselling") return BOOKS.filter((b) => b.bestseller);
  return BOOKS.filter((b) => b.category === key);
}

function countLabel(n) {
  return n + (n === 1 ? " book" : " books");
}

function uniqueAuthors() {
  return [...new Set(BOOKS.map((b) => b.author))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/* One book card, used on the home, categories and detail pages. */
function bookCardHTML(book) {
  const km = book.lang === "km" ? " khmer" : "";
  return `
    <article class="book-card">
      <a class="book-cover" href="bookdetail.html?id=${book.id}">
        <img src="${imgSrc(book)}" alt="Cover of ${esc(book.title)}" loading="lazy" />
      </a>
      <a class="book-title${km}" href="bookdetail.html?id=${book.id}">${esc(book.title)}</a>
      <div class="book-author${km}">${esc(book.author)}</div>
      <div class="book-buy">
        <div class="book-price">${money(book.price)}</div>
        <button type="button" class="btn add-cart-btn" data-add="${book.id}">
          <i class="bi bi-cart-plus"></i> Add to cart
        </button>
      </div>
    </article>`;
}
