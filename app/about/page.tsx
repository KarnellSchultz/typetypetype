import Link from "next/link";

const AboutPage = () => {
    return (
        <div>
            <section className="text-center " >
                <h1 className="text-xl text-center py-4 capitalize">about</h1>
                <h2 className="text-lg text-center capitalize py-4">Test Statistics</h2>
                <ul className="text-base text-left " >
                    <li>Words per minute (WPM) - Calculated by dividing the number of characters typed by 5.
                        Based on Sunburst Digials work, which can be found&nbsp;
                        <Link className="underline"
                            href="https://support.sunburst.com/hc/en-us/articles/229335208-Type-to-Learn-How-are-Words-Per-Minute-and-Accuracy-Calculated">
                            here
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default AboutPage;