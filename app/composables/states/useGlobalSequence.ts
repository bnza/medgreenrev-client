export default function () {
  const counter = useState(States.GlobalSequence, () => 0)
  const increment = () => counter.value++
  return { increment }
}
