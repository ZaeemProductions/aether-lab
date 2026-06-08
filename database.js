// Aether Lab // Cadet Mission Class 5 Central Data Registry
const CMCC_NOTICES = [
  {
    id: "notice-001",
    type: "urgent", // urgent, general, or future categories like 'routine', 'homework'
    date: "June 8, 2026",
    title: "জরুরী নোটিশ: ক্যাডেট ভিত্তিক মডেল টেস্ট ১৪ এর সময়সূচী পরিবর্তন",
    content: "আগামী শুক্রবারের মডেল টেস্টের সময় পরিবর্তন করা হয়েছে। নতুন সময়সূচী অনুযায়ী পরীক্ষা সকাল ৯:০০ টার পরিবর্তে সকাল ১০:০০ টায় শুরু হবে। সকল বালক ও বালিকা শাখার শিক্ষার্থীদের যথাসময়ে উপস্থিত থাকার জন্য নির্দেশ দেওয়া হলো।",
    attachment: null // Can link a PDF or image path later if needed
  },
  {
    id: "notice-002",
    type: "general",
    date: "June 5, 2026",
    title: "সর্বশেষ সাধারণ জ্ঞান (GK 2026) শীট বিতরণ",
    content: "আইডিয়াল ও ক্যাডেট কলেজ ভর্তি পরীক্ষার জন্য বিশেষভাবে তৈরি সর্বশেষ সাধারণ জ্ঞান-২০২৬ এর পরিপূরক শীট মেইন ব্রাঞ্চ ও সকল শাখা অফিস থেকে বিতরণ করা হচ্ছে। শিক্ষার্থীরা তাদের আইডি কার্ড দেখিয়ে সংগ্রহ করতে পারবে।",
    attachment: "/downloads/gk_2026_supplement.pdf"
  },
  {
    id: "notice-003",
    type: "general",
    date: "June 1, 2026",
    title: "অনলাইন অ্যাডমিশন পোর্টাল আপডেট",
    content: "ক্যাডেট মিশন কোচিং সেন্টারের অফিশিয়াল অনলাইন ভর্তি কার্যক্রম এখন সরাসরি এই পোর্টালে সম্পন্ন করা যাবে। বিকাশ বা রকেটের মাধ্যমে ফি প্রদান করে তাৎক্ষণিক কনফার্মেশন স্লিপ সংগ্রহ করুন।",
    attachment: null
  }
];

// FUTURE PROOFING: This is how easily you can plug in new modules later
const CMCC_HOMEWORK = [
  // { id: "hw-001", subject: "Math", task: "Unitary Method Exercise 3", dueDate: "June 12, 2026" }
];
