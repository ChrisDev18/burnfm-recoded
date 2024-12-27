const DefaultExcerpts = [
    "Experience the vibrant energy of student radio on another one of BurnFM's shows.",
    "Listen in to join the excitement of student-led radio with us on BurnFM.",
    "Catch the buzz of student creativity on another one of BurnFM's shows.",
    "Experience the passion and enthusiasm of student broadcasting.",
    "Join the fun with another one of our student-hosted radio programs.",
    "Stay tuned for another exciting student-led show on BurnFM."
];

export function pickExcerpt() {
    return DefaultExcerpts[Math.floor(Math.random() * DefaultExcerpts.length)];
}