import AutoCompleteBox from '@/components/AutoCompleteBox';


export default function Debug() {
  return (
    <div>
      <AutoCompleteBox options={['hello', 'world']} inputString={''} setInputString={() => {}} />
    </div>
  )
}