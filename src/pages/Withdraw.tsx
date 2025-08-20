import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Wallet,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  ArrowRight
} from "lucide-react";

interface WithdrawalEntry {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "processing" | "completed" | "failed";
  upiId?: string;
  reason?: string;
}

const mockEarnings = {
  pending: 150,
  claimable: 850,
  withdrawn: 1450,
  inProcess: 200,
};

const withdrawalHistory: WithdrawalEntry[] = [
  { id: "W001", amount: 500, date: "2024-05-10", status: "completed", upiId: "alex@paytm" },
  { id: "W002", amount: 300, date: "2024-05-05", status: "completed", upiId: "alex@paytm" },
  { id: "W003", amount: 200, date: "2024-05-01", status: "processing", upiId: "alex@paytm" },
  { id: "W004", amount: 450, date: "2024-04-25", status: "completed", upiId: "alex@paytm" },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "processing":
      return <Clock className="h-4 w-4 text-warning" />;
    case "pending":
      return <Clock className="h-4 w-4 text-muted-foreground" />;
    case "failed":
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-success/10 text-success border-success/20";
    case "processing":
      return "bg-warning/10 text-warning border-warning/20";
    case "pending":
      return "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20";
    case "failed":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted";
  }
}

export default function Withdraw() {
  const [upiId, setUpiId] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { toast } = useToast();

  const isWithdrawEnabled = parseInt(withdrawAmount) >= 200 && parseInt(withdrawAmount) <= mockEarnings.claimable && upiId.trim() !== "";

  const handleWithdraw = () => {
    if (!isWithdrawEnabled) return;
    
    toast({
      title: "Withdrawal Initiated! 🎉",
      description: `₹${withdrawAmount} withdrawal request submitted. You'll receive the amount in 2-3 business days.`
    });
    setWithdrawAmount("");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Wallet className="h-8 w-8 text-primary" />
          Withdraw Earnings
        </h1>
        <p className="text-muted-foreground">
          Manage your referral earnings and withdrawals
        </p>
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Pending</span>
            </div>
            <p className="text-xl font-bold">₹{mockEarnings.pending}</p>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">Claimable</span>
            </div>
            <p className="text-xl font-bold text-success">₹{mockEarnings.claimable}</p>
            <p className="text-xs text-muted-foreground">Ready to withdraw</p>
          </CardContent>
        </Card>

        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium text-warning">In Process</span>
            </div>
            <p className="text-xl font-bold text-warning">₹{mockEarnings.inProcess}</p>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Withdrawn</span>
            </div>
            <p className="text-xl font-bold text-primary">₹{mockEarnings.withdrawn}</p>
            <p className="text-xs text-muted-foreground">Total withdrawn</p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Withdraw Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* UPI ID */}
          <div className="space-y-2">
            <Label htmlFor="upi">UPI ID</Label>
            <Input
              id="upi"
              placeholder="yourname@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter your UPI ID to receive payments
            </p>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Withdrawal Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="200"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="200"
              max={mockEarnings.claimable}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimum: ₹200</span>
              <span>Available: ₹{mockEarnings.claimable}</span>
            </div>
          </div>

          {/* Progress to minimum */}
          {parseInt(withdrawAmount) > 0 && parseInt(withdrawAmount) < 200 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Minimum Amount Progress</span>
                <span>{Math.round((parseInt(withdrawAmount) / 200) * 100)}%</span>
              </div>
              <Progress value={(parseInt(withdrawAmount) / 200) * 100} />
            </div>
          )}

          {/* Withdraw Button */}
          <Button 
            onClick={handleWithdraw}
            disabled={!isWithdrawEnabled}
            className="w-full gap-2"
            size="lg"
          >
            {isWithdrawEnabled ? (
              <>
                Withdraw ₹{withdrawAmount}
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Enter valid amount and UPI ID"
            )}
          </Button>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>• Withdrawals are processed within 2-3 business days</p>
            <p>• No processing fees on withdrawals</p>
            <p>• UPI ID will be verified before processing</p>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {withdrawalHistory.map((entry, index) => (
              <div key={entry.id}>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(entry.status)}
                    <div>
                      <p className="font-medium">₹{entry.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()} • {entry.upiId}
                      </p>
                      {entry.reason && (
                        <p className="text-xs text-destructive mt-1">
                          {entry.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className={getStatusColor(entry.status)}>
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      ID: {entry.id}
                    </p>
                  </div>
                </div>
                {index < withdrawalHistory.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}