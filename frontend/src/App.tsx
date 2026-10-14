import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { SeverityIndicator } from "./components/ui/severity-indicator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination"
import { Moon, Sun } from "lucide-react"

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background text-text-primary p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-brand">NETRA Design System</h1>
            <p className="text-text-secondary mt-2">Base UI components for F1-T2</p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-background-card pb-2">1. Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-background-card pb-2">2. Cards & Elevated Surfaces</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Overview</CardTitle>
                <CardDescription>System wide analysis for the last 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">This is a reusable card surface component that adheres to NETRA's cybersecurity visual palette.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-background-card pb-2">3. Badges & Indicators</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 items-center">
            <SeverityIndicator level="CRITICAL" />
            <SeverityIndicator level="HIGH" />
            <SeverityIndicator level="MEDIUM" />
            <SeverityIndicator level="LOW" />
            <SeverityIndicator level="BENIGN" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-background-card pb-2">4. Standard Table</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">EVT-9382</TableCell>
                  <TableCell>Malicious IP Detected</TableCell>
                  <TableCell><SeverityIndicator level="CRITICAL" /></TableCell>
                  <TableCell className="text-right text-text-secondary">14:21:05</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">EVT-9381</TableCell>
                  <TableCell>Anomalous Outbound Traffic</TableCell>
                  <TableCell><SeverityIndicator level="HIGH" /></TableCell>
                  <TableCell className="text-right text-text-secondary">11:12:44</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-background-card pb-2">5. Pagination</h2>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </div>
    </div>
  )
}

export default App
