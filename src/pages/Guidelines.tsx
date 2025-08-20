import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  PlayCircle,
  ExternalLink,
  Share,
  Users,
  Gift
} from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Share Your Code",
    description: "Share your unique referral code with friends and family",
    icon: Share
  },
  {
    step: 2,
    title: "Friend Signs Up",
    description: "Your friend uses your code to create a Testbook account",
    icon: Users
  },
  {
    step: 3,
    title: "Purchase Confirmation",
    description: "Friend makes their first purchase within 30 days",
    icon: Gift
  },
  {
    step: 4,
    title: "Earn Rewards",
    description: "You receive cashback and climb the leaderboard!",
    icon: CheckCircle
  }
];

const dos = [
  "Share your referral code with genuine friends and family",
  "Explain the benefits of Testbook to your referrals", 
  "Help your friends navigate the platform if they need assistance",
  "Share on your social media with a personal recommendation",
  "Be patient - purchases can take up to 30 days to reflect",
  "Keep track of your referrals in the dashboard"
];

const donts = [
  "Don't spam or send unsolicited messages",
  "Don't create fake accounts to refer yourself",
  "Don't mislead people about Testbook's services",
  "Don't share in irrelevant groups or forums",
  "Don't pressure friends to make immediate purchases",
  "Don't share your personal referral earnings publicly"
];

const faqs = [
  {
    question: "How long does it take for referrals to show up?",
    answer: "Referrals appear instantly when someone signs up, but cashback is credited only after their first purchase is confirmed (usually within 24-48 hours)."
  },
  {
    question: "My friend didn't purchase, what happened?",
    answer: "Your friend has 30 days from signup to make their first purchase. If they don't purchase within this period, the referral won't convert to earnings."
  },
  {
    question: "Can I refer the same person multiple times?",
    answer: "No, each person can only be referred once. Subsequent purchases by the same person won't generate additional referral rewards."
  },
  {
    question: "What if my referral gets a refund?",
    answer: "If your referred friend gets a full refund, the corresponding cashback will be deducted from your account."
  },
  {
    question: "Is there a limit to how many people I can refer?",
    answer: "No limit! You can refer as many people as you want. More referrals mean more earnings and higher ranks."
  }
];

export default function Guidelines() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Referral Guidelines
        </h1>
        <p className="text-muted-foreground">
          Everything you need to know about our referral program
        </p>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.step} className="text-center space-y-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center">
                    {step.step}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-0.5 bg-border transform translate-x-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            Quick Tutorial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center space-y-3">
            <PlayCircle className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h3 className="font-semibold">How to Maximize Your Referrals</h3>
              <p className="text-sm text-muted-foreground">2 minute tutorial (Coming Soon)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Do's */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="h-5 w-5" />
              Do's
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Don'ts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Don'ts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Referral rewards are subject to Testbook's terms of service</p>
            <p>• Cashback amounts may vary based on the course purchased</p>
            <p>• Testbook reserves the right to modify or terminate the referral program</p>
            <p>• Fraudulent activities will result in account suspension</p>
            <p>• Disputes will be resolved within 15 business days</p>
          </div>
          <div className="pt-4">
            <a 
              href="#" 
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              Read full Terms & Conditions
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}