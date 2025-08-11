import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <main className="space-y-6">
      <Seo title="About — IJTIMA Collection" description="What this site is about and how to explore it." />

      <div className="mb-2">
        <Link to="/">
          <Button variant="secondary" size="sm">Back to Home</Button>
        </Link>
      </div>

      <section className="glass-surface module-frame p-6 md:p-8 space-y-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ijtima</h1>
        <p>
          Ijtima (Arabic) is a gathering/congregation in the Muslim community, often connoting the assembly of individuals for spiritual, educational and personal upliftment purposes. The gatherings provide educational sessions to inform participants about various aspects of Islamic teachings, current issues and personal development. Since it has a significant effect on Muslims’ lives and on a large number of people who engage in Ijtema, it is a valuable component of the Tablighi Jamaat worldwide. It enables the participator to learn from experiences and to receive guidance from scholars and leaders. The significance of Ijtima extends beyond gatherings; it fosters spiritual growth, personal growth and educational advancement within the community.
        </p>
        <p>
          The organization extends an invitation to all Muslims for a three- or four-day event known as an Ijtima, which is held on an open field with tents set up to accommodate the attendees. Elaborate arrangements are created months in advance and carried out by hundreds of volunteers. Food, parking, and security are all provided for the congregants.
        </p>
        <p>
          Aspects of the illustrious Islamic Golden Age of Al Madinah Al Munawarah, during the glory years of Nabi ﷺ and the Sahaba, are brought to life by Ijtima. It is an assembly of people from numerous nations, languages, cultures, and communities united together by Imaan. By putting the blessed Sunnah of Nabi ﷺ into practice and instilling it with love, kindness, compassion, peace, and harmony, it seeks to reform the Ummah. One of Nabi ﷺ’s greatest concerns was the complete adoption of Islam in mankind. These Ijtimas are held out of this concern (for Deen and Sunnah). Therefore, Jamaats (groups) are to be prepared to go to far-off areas around the globe by dedicating their time, resources, and health to the resuscitation of the Islamic spirit in a manner similar to the time of Nabi Muhammad ﷺ, Sahabah and Tabi’in.
        </p>
        <p>
          It is imperative that the talks of encouragement at Ijtima’s are attended by all for the entire duration. To provide us with encouragement and fortitude to practice Complete Deen, these lectures must become deeply embedded in and permanently recorded in our hearts, thoughts, minds, and lives. The online recordings of the Ijtima are provided for those who were not in a position to attend the lectures. May Allah grant us all the ability and Taufeeq to benefit from these lectures and May Allah imprint and record them into our hearts and life.
        </p>
        <p className="font-semibold">Ameen آمين</p>
      </section>
    </main>
  );
};

export default About;
