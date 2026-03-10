import { notFound } from "next/navigation";
import { ChapterPageLayout, type ChapterSectionContent } from "../../../../components/layout/ChapterPageLayout";
import { chapterByRoute } from "../../../../lib/chapterMetadata";

const partSlug = "part-00-preface";
const chapterSlug = "preface";

const sectionContent: ChapterSectionContent[] = [
  {
    "title": "Introduction",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Hi! I'm Kevinouio or Kevin Ho."
      },
      {
        "type": "paragraph",
        "text": "I'm an undergraduate studing Mathematics and Computer Science. You might be wondering, \"Hey is this guy a quant or a wanna be quant or something?\" or \"This guy must be very smart or somthing\". Well I'll tell you what, I'm just a wanna be who just wants to learn about finance. I personally have no idea about anything about finance when it comes to investing, trading, or even quantatative finance."
      }
    ]
  },
  {
    "title": "What is this website?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "So this website is just myself teaching my topics of finance in long horizing investing, quant topics, and other finance stuff that I don't really understand yet. So bare with me if any of the information feels repetive or boring. I plan and am going to be writing this website with this general structure in mind being:"
      },
      {
        "type": "orderedList",
        "items": [
          "Introduction to the topic",
          "Some general verbage and jargon that relates to the topic",
          "Code along with the explanations of the method",
          "Sometimes an interactive demostration of the method."
        ]
      },
      {
        "type": "paragraph",
        "text": "Now for the stucture of the whole textbook will be as follows."
      },
      {
        "type": "orderedList",
        "items": [
          "Foundations",
          "Long Horizon Investing",
          "Systematic Trading",
          "Event Driven Relative Value",
          "Derivatives Volatitly",
          "Microstructure Execution",
          "Discretionary Hybrid",
          "Synthesis",
          "Appendix"
        ]
      },
      {
        "type": "paragraph",
        "text": "The first chapter mainly covers the foundations knowledge before a person should go over before they actually start learning how investing works and before creating their algorithms. Example I personally don't really know much about Volatitly or anything about it and I for sure shouldn't really mess with it until I properly can explain it correctly. This Part of the Website will just go over all of the Jargon though so if you are already comfortable with that, I would skip it I would assume (idk yet about how much is needed from this chapter). So"
      },
      {
        "type": "paragraph",
        "text": "The second chapter more goes onto the topic of how to predict the long horizon movement of a given market. (I really only know long horizon from learning about Reinforcement Learning so idk much)"
      },
      {
        "type": "paragraph",
        "text": "NOTE: WRITE THE REST OF THESE CHAPTERS DESCRIPTION WHEN I FINISH EACH CHAPTERS"
      }
    ]
  },
  {
    "title": "How can I contact you?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Well I would suggest emailing me or contacting me from my personal website at kevinouio.com. If there is anything that is wrong with anything that I had put into this website that you believe that I should change, please issue a pull request or an issue on the github for this project. All suggestions to how i should approach this is appreciated."
      }
    ]
  },
  {
    "title": "Why are you doing this?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "So my reason for writing this full textbook is out of pure want to learn how I can apply my own knowledge in mathematics, statistics, and computer science in finance. Now I am currently a junior writing this full website in college with no internships or even research ready for the summer so this is just a side project that I want to do. I've feel very behind when it comes to this topic relative to my peers that I meet at hackathons or even research conferences that I go to. This notebook is just a way for me to compensate for that tbh. (sorry about all the yapping btw this is my first time even writing something of the sorts)"
      },
      {
        "type": "paragraph",
        "text": "I also just want to learn a more algorithmic way to invest rather than relying on just ETFs or other sites or banks that just invest my money for me. I don't want to be waiting 10 years down the line of me putting just 200$ of my money investing every month into a bank. That just in theory feels inefficent. So this is just my way of learning the full systems and the ins and outs of investing and how the Hedge funds do their stuff."
      },
      {
        "type": "paragraph",
        "text": "I also want to develop my"
      }
    ]
  },
  {
    "title": "Closing Thoughts",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Now I want to give thanks to my friends for pushing me to being the most productive person that I try to be even though most of the time, I'm just thinking or not acting on anything. I hope me creating this project inspires you to also do something similar. Also I might end up writing this as if it is a math textbook so sorry in advance for the math formality that I might include in my definitions of words and etc."
      },
      {
        "type": "paragraph",
        "text": "SOOOOO with that being said, I welcome you to my first \"textbook\" where i provide my own understanding of the topics of finance using math and computer science concepts."
      }
    ]
  }
];

export default function Page() {
  const chapter = chapterByRoute(partSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  return <ChapterPageLayout chapter={chapter} sectionContent={sectionContent} />;
}
